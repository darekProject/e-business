package models

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

/**
  * A repository for people.
  *
  * @param dbConfigProvider The Play db config provider. Play will inject this for you.
  */
@Singleton
class CommentsRepository @Inject()(dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  class CommentsTable(tag: Tag) extends Table[Comments](tag, "comments") {

    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)

    def userName = column[String]("userName")

    def content = column[String]("content")

    def prodId = column[Int]("prodId")

    def timestamp = column[String]("timestamp")

    def * = (id, content, userName, prodId, timestamp) <> ((Comments.apply _).tupled, Comments.unapply)
  }

  val comment = TableQuery[CommentsTable]

  def create(content: String, userName: String, prodId: Int, timestamp: String) : Future[Comments] = db.run {
    (comment.map(c => (c.content, c.userName, c.prodId, c.timestamp))
      returning comment.map(_.id)
      into { case ((`content`, `userName`, `prodId`, `timestamp`), id) => Comments(id, content, userName, prodId, timestamp) }
      ) += (content, userName, prodId, timestamp)
  }

  def list(): Future[Seq[Comments]] = db.run {
    comment.result
  }
}
