package controllers

import javax.inject._
import models._
import play.api.libs.json._
import play.api.mvc._

import scala.collection.mutable.ArrayBuffer
import scala.concurrent.{ExecutionContext, Future}


class CartControllers @Inject()(cartRepo: CartRepository,
                                cc: MessagesControllerComponents
                               )(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  import play.api.libs.json.Json

  def addCart(): Action[JsValue] = Action.async(parse.json) { implicit request =>

    val cartFromJson: JsResult[Cart] = Json.fromJson[Cart](request.body)

    cartFromJson match {
      case JsSuccess(c: Cart, path: JsPath) =>
        cartRepo.create(c.products, c.userId).map {
          _ =>
            Ok(Json.obj(
              "status" -> "OK"
            ))
        }
      case e: JsError => Future.successful(Ok("Errors: " + JsError.toJson(e).toString()))
    }
  }

  def getCart(id: Int): Action[AnyContent] = Action.async { implicit request =>
    var cartById = new ArrayBuffer[Cart]()

    cartRepo.list().map { carts =>
      carts.foreach(cart => {
        if (cart.userId == id) {
          cartById += cart
        }
      })
      Ok(Json.toJson(cartById))
    }
  }
}