# --- !Ups

create table "category" (
  "id" integer not null primary key autoincrement,
  "name" varchar not null
);

create table "orders" (
  "id" integer not null primary key autoincrement,
  "address" varchar not null,
  "dataSend" date not null,
  "fee" float not null,
  "sent" varchar not null,
  products integer no null,
  user integer no null,
  foreign key(products) references product(id),
  foreign key(user) references user(id)
);

create table if not exists "product" (
  "id" integer not null primary key autoincrement,
  "name" varchar not null,
  "description" varchar not null,
  "keyWords" varchar not null,
  "prize"  varchar not null,
  "imgUrl" varchar not null,
  "category" varchar not null
);

create table if not exists "comments" (
  "id" integer not null primary key autoincrement,
  "userName" varchar not null,
  "content" varchar not null,
  "prodId" integer not null,
  "timestamp"  varchar not null
);

create table "user" (
  "id" integer not null primary key autoincrement,
  "firstName" varchar not null,
  "lastName" varchar not null,
  "fullName" varchar not null,
  "email" varchar not null,
  "token" varchar not null
);

create table "cart" (
  "id" integer not null primary key autoincrement,
  "products" varchar not null,
  "userId" varchar not null
);

# --- !Downs

drop table if exists "orders";
drop table if exists "product";
drop table if exists "user";
drop table if exists "category";
