package models

import play.api.libs.json._

case class Product(id: Long, name: String, description: String, keyWords: String, category: Int)

object Product {
  implicit val productFormat: OFormat[Product] = Json.format[Product]
}
