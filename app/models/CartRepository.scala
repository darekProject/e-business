package models

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

/**
  * A repository for people.
  *
  * @param dbConfigProvider The Play db config provider. Play will inject this for you.
  */
@Singleton
class CartRepository @Inject()(dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {

  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  class CartTable(tag: Tag) extends Table[Cart](tag, "cart") {

    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)

    def products = column[String]("products")

    def userId = column[Int]("userId")

    def * = (id, products, userId) <> ((Cart.apply _).tupled, Cart.unapply)
  }

  val cart = TableQuery[CartTable]

  def create(products: String, userId: Int): Future[Cart] = db.run {
    (cart.map(c => (c.products, c.userId))
      returning cart.map(_.id)
      into { case ((`products`, `userId`), id) => Cart(id, products, userId) }
      ) += (products, userId)
  }

  def list(): Future[Seq[Cart]] = db.run {
    cart.result
  }
}
