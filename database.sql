-- CREATE DATABASE "solo" 


-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- Create the following tables: 

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "access_level" INT DEFAULT 0
);


CREATE TABLE "favorites" (
	"id" SERIAL PRIMARY KEY,
	"restr_name" VARCHAR (255) NOT NULL,
	"photos_url" VARCHAR (4000) NOT NULL,
	"user_rating" NUMERIC(3,2) NOT NULL,
	"user_id" int REFERENCES "user"
);


CREATE TABLE "drool_list" (
	"id" SERIAL PRIMARY KEY,
	"restr_name" VARCHAR (255) NOT NULL,
	"photos_url" VARCHAR (4000) NOT NULL,
	"user_id" int REFERENCES "user"
);


CREATE TABLE "Downtown_Core_Old" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80) NOT NULL,
    "rating" NUMERIC(3, 2) NOT NULL,
    "user_ratings_count" INT NOT NULL,
    "prominence" INT NOT NULL,
    "photos_reference" VARCHAR (1000) NOT NULL,
    "photos_url" VARCHAR (4000),
    "place_id" VARCHAR (80) NOT NULL
);
