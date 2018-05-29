package controllers

import javax.inject._
import models._
import play.api.libs.json.Json.toJson
import play.api.libs.json._
import play.api.mvc._
import java.nio.file.Paths

import scala.concurrent.{ExecutionContext, Future}


class ImagesUploaderController @Inject()(categoryRepo: CategoryRepository,
                                         cc: MessagesControllerComponents
                                )(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  import play.api.libs.json.Json

  def upload = Action(parse.multipartFormData) { request =>
    request.body.file("picture").map { picture =>

      // only get the last part of the filename
      // otherwise someone can send a path like ../../home/foo/bar.txt to write to other files on the system
      val filename = Paths.get(picture.filename).getFileName

      picture.ref.moveTo(Paths.get(s"/client/public/images/$filename"), replace = true)
      Ok(Json.obj(
        "status" -> "OK"
      ))
    }.getOrElse {
      Ok(toJson("Errors. Images was not upload!"))
    }
  }
}
