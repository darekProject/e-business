package controllers

import javax.inject._
import models._

import play.api.libs.json.Json.toJson
import play.api.libs.json._
import play.api.mvc._

import scala.collection.mutable.ArrayBuffer
import scala.concurrent.{ExecutionContext, Future}

case class KeySearch(key: String)

object KeySearch {
  implicit val keySearchFormat: OFormat[KeySearch] = Json.format[KeySearch]
}

class ProductController @Inject()(productsRepo: ProductRepository, categoryRepo: CategoryRepository,
                                  cc: MessagesControllerComponents
                                 )(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  import play.api.libs.json.Json

  def addProduct(): Action[JsValue] = Action.async(parse.json) { implicit request =>

    val productFromJson: JsResult[Product] = Json.fromJson[Product](request.body)

    productFromJson match {
      case JsSuccess(p: Product, path: JsPath) =>
        productsRepo.create(p.name, p.description, p.keyWords, p.category, p.imgUrl, p.prize).map {
          _ =>
            Ok(Json.obj(
              "status" -> "OK"
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

  def getProduct(id: Int) = Action.async { implicit request =>
    var productsById = new ArrayBuffer[Product]()

    productsRepo.list().map { products =>
      products.foreach(product => {
        if (product.id == id) {
          productsById += product
        }
      })
      Ok(Json.toJson(productsById))
    }
  }

  def getProductsByKeyWords: Action[JsValue] = Action.async(parse.json) { implicit request =>

    val keyFromJson: JsResult[KeySearch] = Json.fromJson[KeySearch](request.body)
    var productsByKeyWords = new ArrayBuffer[Product]()
    var key = new ArrayBuffer[StringBuffer]()

    keyFromJson match {
      case JsSuccess(k: KeySearch, path: JsPath) =>
        k.key.split(",").foreach(k => {
          key += new StringBuffer(k)
        })
    }

    productsRepo.list().map { products =>
      products.foreach(product => {
        key.foreach(k => {
          if (product.keyWords.contentEquals(k)) {
            productsByKeyWords += product
          }
        })

      })
    }

    Future.successful(Ok(toJson(productsByKeyWords)))
  }
}

case class CreateProductForm(name: String, description: String, category: Int)
