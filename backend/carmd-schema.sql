CREATE TABLE users (

    id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    email TEXT NOT NULL

);


CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    year  TEXT NOT NULL,
    make TEXT NOT NULL,
    model TEXT NOT NULL
    
);

