package models

import play.api.libs.json._

case class User(id: Long, fullName: String, address: String, role: String, orders: Int)

object User {
  implicit val userFormat: OFormat[User] = Json.format[User]
}
