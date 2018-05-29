package models

import play.api.libs.json.{Json, OFormat}

case class Comments(id: Int, content: String, userName: String, prodId: Int, timestamp: String)


object Comments {
  implicit val commentsFormat: OFormat[Comments] = Json.format[Comments]
}