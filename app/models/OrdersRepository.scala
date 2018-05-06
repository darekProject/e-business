package models

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile
import slick.lifted.ProvenShape

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class OrdersRepository @Inject()(dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {

  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  class OrdersTable(tag: Tag) extends Table[Orders](tag, "orders") {

    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)

    def address = column[String]("address")

    def dataSend = column[String]("dataSend")

    def fee = column[Float]("fee")

    def sent = column[Boolean]("sent")

    def products = column[Int]("products")

    def user = column[Int]("user")

    def * : ProvenShape[Orders] = (id, address, dataSend, fee, sent, products, user) <> ((Orders.apply _).tupled, Orders.unapply)

  }

  val orders = TableQuery[OrdersTable]

  def create(address: String, dataSend: String, fee: Float, sent: Boolean, products: Int, user: Int): Future[Orders] = db.run {
    (orders.map(o => (o.address, o.dataSend, o.fee, o.sent, o.products, o.user))
      returning orders.map(_.id)
      into { case ((`address`, `dataSend`, `fee`, `sent`, `products`, `user`), id) => Orders(id, address, dataSend, fee, sent, products, user) }
      ) += (address, dataSend, fee, sent, products, user)
  }

  def list(): Future[Seq[Orders]] = db.run {
    orders.result
  }
}
