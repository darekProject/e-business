package controllers

import javax.inject._
import models._
import play.api.data.Form
import play.api.data.Forms._
import play.api.data.validation.Constraints._
import play.api.i18n._
import play.api.libs.json.Json.toJson
import play.api.libs.json._
import play.api.mvc._

import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Failure, Success}

class ProductController @Inject()(productsRepo: ProductRepository, categoryRepo: CategoryRepository,
                                  cc: MessagesControllerComponents
                                 )(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  import play.api.libs.json.Json

  def addProduct(): Action[JsValue] = Action.async(parse.json) { implicit request =>

    val productFromJson: JsResult[Product] = Json.fromJson[Product](request.body)

    productFromJson match {
      case JsSuccess(p: Product, path: JsPath) =>
        productsRepo.create(p.name, p.description, p.keyWords, p.category).map {
          _ =>
            Ok(Json.obj(
              "status" -> "OK",
              "name" -> p.name,
              "description" -> p.description,
              "keyWords" -> p.keyWords,
              "category" -> p.category
            ))
        }
      case e: JsError => Future.successful(Ok("Errors: " + JsError.toJson(e).toString()))
    }

  }

  def getProducts: Action[AnyContent] = Action.async { implicit request =>
    productsRepo.list().map { products =>
      Ok(toJson(products))
    }
  }
}

case class CreateProductForm(name: String, description: String, category: Int)
