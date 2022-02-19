CREATE TABLE users (
    id SERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(500) NOT NULL UNIQUE,
    password VARCHAR(500) NOT NULL,
    email TEXT NOT NULL UNIQUE,
    pfp TEXT NOT NULL DEFAULT 'https://i.imgur.com/igF2kHr.png'
);

CREATE TABLE pins (
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    description VARCHAR(255),
    image TEXT NOT NULL,
    user_id SERIAL NOT NULL REFERENCES user(id)
);

INSERT INTO users (username, password, email) VALUES ('Goop', 'Goop', 'goop@email.com');

ALTER TABLE users ALTER COLUMN username TYPE VARCHAR (500) NOT NULL;
