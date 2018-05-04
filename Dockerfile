FROM ubuntu

# update apt repositories
RUN apt-get update

# package for https://foo
RUN apt-get install apt-transport-https -y

# install java -- default-jdk contain jre
RUN apt-get install default-jdk -y

#install scala
RUN apt-get install scala -y

# instruction page - https://www.scala-sbt.org/1.0/docs/Installing-sbt-on-Linux.html
RUN echo "deb https://dl.bintray.com/sbt/debian /" | tee -a /etc/apt/sources.list.d/sbt.list && \
    apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2EE0EA64E40A89B84B2DF73499E82A75642AC823 && \
    apt-get update && \
    apt-get install sbt -y

#install mysql
RUN apt-get update
RUN export DEBIAN_FRONTEND=noninteractive
ENV MYSQL_ROOT_PASS root
RUN echo "mysql-server mysql-server/root_password password ${MYSQL_ROOT_PASS}" | debconf-set-selections  && \
    echo "mysql-server mysql-server/root_password_again password ${MYSQL_ROOT_PASS}" | debconf-set-selections
RUN apt-get -q -y install mysql-server mysql-client

RUN mkdir /scala_app
WORKDIR /scala_app

# copy file to workdir
COPY ./build.sbt ./
RUN sbt update

# add all dependency of build.sbt
CMD sbt console