package models

import play.api.libs.json._

case class Orders(id: Int, address: String, dateSend: String, fee: Float, sent: Boolean, products: Int, user: Int)

object Orders {
  implicit val ordersFormat: OFormat[Orders] = Json.format[Orders]
}