CREATE DATABASE authority;

CREATE TABLE IF NOT EXISTS users (
  id serial NOT NULL,
  name varchar(450) not null,
  username varchar(450) not null,
  password varchar(450) NOT NULL,
  PRIMARY KEY (id)
)