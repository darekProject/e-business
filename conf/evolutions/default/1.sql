# --- !Ups

create table "category" (
  "id" integer not null primary key autoincrement,
  "name" varchar not null
);

create table "product" (
  "id" integer not null primary key autoincrement,
  "name" varchar not null,
  "description" text not null,
  "keyWords" text not null,
  category int not null,
  foreign key(category) references category(id)
);

create table "orders" (
  "id" integer not null primary key autoincrement,
  "address" varchar not null,
  "dataSend" date not null,
  "fee" float not null,
  "sent" varchar not null,
  product integer no null,
  foreign key(product) references product(id)
);

create table "user" (
  "id" integer not null primary key autoincrement,
  "fullName" varchar not null,
  "address" varchar not null,
  "role" integer not null,
  orders int not null,
  foreign key(orders) references orders(id)
);


# --- !Downs

drop table "product" if exists;
drop table "category" if exists;
drop table "orders" if exists;
drop table "user" if exists;
