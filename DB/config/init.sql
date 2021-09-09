BEGIN;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    fname VARCHAR(255) NOT NULL ,
    datejoin VARCHAR(255) NOT NULL
);

CREATE TABLE profiles(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    avatar TEXT NOT NULL,
    background TEXT NOT NULL,
    bio TEXT NOT NULL,
    country TEXT NOT NULL,
    birthday TEXT NOT NULL,
    gender TEXT NOT NULL,
    job TEXT NOT NULL,
    facebook TEXT NOT NULL,
    instagram TEXT NOT NULL,
    hobbies TEXT NOT NULL,
    id_table_follow  TEXT NOT NULL
);

CREATE TABLE all_users_posts(
    id SERIAL PRIMARY KEY,
    username  VARCHAR(100) NOT NULL,
    id_post  TEXT NOT NULL
);


CREATE TABLE chat(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    dateSend TEXT NOT NULL,
    timeSend TEXT NOT NULL,
    stateDay TEXT NOT NULL,
    msgContent TEXT NOT NULL
);


CREATE TABLE gif(
    id SERIAL PRIMARY KEY,
    src TEXT NOT NULL,
    category TEXT NOT NULL,
    prpo TEXT NOT NULL
);

SET client_encoding TO 'UTF8';
COMMIT;