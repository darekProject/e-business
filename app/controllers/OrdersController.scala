package controllers

import javax.inject._
import models._
import play.api.libs.json.Json.toJson
import play.api.libs.json._
import play.api.mvc._

import scala.collection.mutable.ListBuffer
import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Failure, Success}
import scala.collection.mutable.ArrayBuffer


class OrdersController @Inject()(ordersRepo: OrdersRepository, productsRepo: ProductRepository, categoryRepo: CategoryRepository,
                                 cc: MessagesControllerComponents
                                )(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  import play.api.libs.json.Json

  def addOrders(): Action[JsValue] = Action.async(parse.json) { implicit request =>

    val ordersFromJson: JsResult[Orders] = Json.fromJson[Orders](request.body)

    ordersFromJson match {
      case JsSuccess(o: Orders, path: JsPath) =>
        ordersRepo.create(o.address, o.dateSend, o.fee, o.sent, o.products, o.user).map {
          _ =>
            Ok(Json.obj(
              "status" -> "OK",
              "address" -> o.address,
              "dataSend" -> o.dateSend,
              "fee" -> o.fee,
              "sent" -> o.sent,
              "product" -> o.products,
              "user" -> o.user
            ))
        }
      case e: JsError => Future.successful(Ok("Errors: " + JsError.toJson(e).toString()))
    }

  }

  def getOrders: Action[AnyContent] = Action.async { implicit request =>
    ordersRepo.list().map { orders =>
      Ok(toJson(orders))
    }
  }

  def getOrdersByUser(id: Int): Action[JsValue] = Action.async(parse.json) { implicit request =>

    var ordersPerUser = new ArrayBuffer[Orders]()

    ordersRepo.list().map { orders =>
      orders.foreach(order => {
        if (order.user == id) {
          ordersPerUser += order
        }
      })
    }

    Future.successful(Ok(toJson(ordersPerUser)))
  }
}
