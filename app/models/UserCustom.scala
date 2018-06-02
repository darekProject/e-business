package models

import java.util.UUID

import com.mohiva.play.silhouette.api.{Identity, LoginInfo}
import play.api.libs.json.{Json, OFormat}

/**
  * The user object.
  *
  * @param firstName Maybe the first name of the authenticated user.
  * @param lastName  Maybe the last name of the authenticated user.
  * @param fullName  Maybe the full name of the authenticated user.
  * @param email     Maybe the email of the authenticated provider.
  *
  */
case class UserCustom(
                        id: Int,
                        firstName: Option[String],
                        lastName: Option[String],
                        fullName: Option[String],
                        email: Option[String],
                        token: String)

object UserCustom {
  implicit val userCustomFormat: OFormat[UserCustom] = Json.format[UserCustom]
}
