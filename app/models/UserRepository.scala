package models

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile
import models.OrdersRepository

import scala.concurrent.{ExecutionContext, Future}

/**
  * A repository for people.
  *
  * @param dbConfigProvider The Play db config provider. Play will inject this for you.
  */
@Singleton
class UserRepository @Inject()(dbConfigProvider: DatabaseConfigProvider, ordersRepository: OrdersRepository)(implicit ec: ExecutionContext) {
  // We want the JdbcProfile for this provider
  private val dbConfig = dbConfigProvider.get[JdbcProfile]

  // These imports are important, the first one brings db into scope, which will let you do the actual db operations.
  // The second one brings the Slick DSL into scope, which lets you define the table and other queries.
  import dbConfig._
  import profile.api._

  /**
    * Here we define the table. It will have a name of people
    */
  import ordersRepository.OrdersTable

  private class UserTable(tag: Tag) extends Table[User](tag, "user") {

    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)

    def fullName = column[String]("fullName")

    def address = column[String]("address")

    def role = column[String]("role")

    def orders = column[Int]("orders")

    def orders_fk = foreignKey("orders_fk", orders, ord)(_.id)

    def * = (id, fullName, address, role, orders) <> ((User.apply _).tupled, User.unapply)

  }

  import ordersRepository.OrdersTable

  private val ord = TableQuery[OrdersTable]

  private val user = TableQuery[UserTable]

  def create(fullName: String, address: String, role: String, orders: Int): Future[User] = db.run {
    // We create a projection of just the name and age columns, since we're not inserting a value for the id column
    (user.map(u => (u.fullName, u.address, u.role, u.orders))
      // Now define it to return the id, because we want to know what id was generated for the person
      returning user.map(_.id)
      // And we define a transformation for the returned value, which combines our original parameters with the
      // returned id
      into { case ((`fullName`, `address`, `role`, `orders`), id) => User(id, fullName, address, role, orders) }
      // And finally, insert the person into the database
      ) += (fullName, address, role, orders)
  }

  def list(): Future[Seq[User]] = db.run {
    user.result
  }
}
