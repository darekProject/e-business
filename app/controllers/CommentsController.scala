package controllers

import javax.inject._
import models._
import play.api.libs.json._
import play.api.mvc._

import scala.collection.mutable.ArrayBuffer
import scala.concurrent.{ExecutionContext, Future}


class CommentsController @Inject()(commentsRepo: CommentsRepository,
                                   cc: MessagesControllerComponents
                                  )(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  import play.api.libs.json.Json

  def addComments(): Action[JsValue] = Action.async(parse.json) { implicit request =>

    val commentsFromJson: JsResult[Comments] = Json.fromJson[Comments](request.body)

    commentsFromJson match {
      case JsSuccess(c: Comments, path: JsPath) =>
        commentsRepo.create(c.content, c.userName, c.prodId, c.timestamp).map {
          _ =>
            Ok(Json.obj(
              "status" -> "OK"
            ))
        }
      case e: JsError => Future.successful(Ok("Errors: " + JsError.toJson(e).toString()))
    }

  }

  def getComments(id: Int): Action[AnyContent] = Action.async { implicit request =>
    var commentsById = new ArrayBuffer[Comments]()

    commentsRepo.list().map { comments =>
      comments.foreach(comment => {
        if (comment.prodId == id) {
          commentsById += comment
        }
      })
      Ok(Json.toJson(commentsById))
    }
  }
}
