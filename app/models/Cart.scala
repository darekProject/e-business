package models

import play.api.libs.json.{Json, OFormat}

case class Cart(id: Int, products: String, userId: String)

object Cart {
  implicit val commentsFormat: OFormat[Cart] = Json.format[Cart]
}

