package models

import java.util.UUID

import com.mohiva.play.silhouette.api.LoginInfo
import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile
import models.OrdersRepository
import models.daos.UserDAOImpl.users

import scala.collection.mutable
import scala.concurrent.{ExecutionContext, Future}

/**
  * A repository for people.
  *
  * @param dbConfigProvider The Play db config provider. Play will inject this for you.
  */
@Singleton
class UserCustomRepository @Inject()(dbConfigProvider: DatabaseConfigProvider, ordersRepository: OrdersRepository)(implicit ec: ExecutionContext) {
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

  private class UserCustomTable(tag: Tag) extends Table[UserCustom](tag, "user") {

    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)

    def firstName = column[Option[String]]("firstName")

    def lastName = column[Option[String]]("lastName")

    def fullName = column[Option[String]]("fullName")

    def email = column[Option[String]]("email")

    def token = column[String]("token")

    def * = (id, firstName, lastName, fullName, email, token) <> ((UserCustom.apply _).tupled, UserCustom.unapply)

  }

  private val users = TableQuery[UserCustomTable]

  def create(firstName: Option[String], lastName: Option[String], fullName: Option[String], email: Option[String], token: String): Future[UserCustom] = db.run {
    // We create a projection of just the name and age columns, since we're not inserting a value for the id column
    (users.map(u => (u.firstName, u.lastName, u.fullName, u.email, u.token))
      // Now define it to return the id, because we want to know what id was generated for the person
      returning users.map(_.id)
      // And we define a transformation for the returned value, which combines our original parameters with the
      // returned id
      into { case ((`firstName`, `lastName`, `fullName`, `email`, `token`), id) => UserCustom(id, firstName, lastName, fullName, email, token) }
      // And finally, insert the person into the database
      ) += (firstName, lastName, fullName, email, token)
  }


  def list(): Future[Seq[UserCustom]] = db.run {
    users.result
  }
}
