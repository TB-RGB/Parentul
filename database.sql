-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "preferences" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);


CREATE TABLE "preferences" (
    "user_id" INT,
    "notifications_email" BOOLEAN,
    "notifications_sms" BOOLEAN,
    "notifications_push" BOOLEAN,
    "notifications_freq" VARCHAR(120),
    "updated_at" timestamp
);


CREATE TABLE "faq" (
    "id" INTEGER,
    "question" VARCHAR(12000),
    "answer" VARCHAR(12000)
    
);