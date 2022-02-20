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
    description TEXT,
    image TEXT NOT NULL,
    user_id SERIAL NOT NULL REFERENCES users(id),
    user_username VARCHAR(500) NOT NULL
);

CREATE TABLE hashtags (
    id SERIAL NOT NULL PRIMARY KEY,
    tag VARCHAR(255) NOT NULL,
    pin_id SERIAL NOT NULL REFERENCES pins(id)
);

CREATE TABLE collections (
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    description TEXT, 
    user_id SERIAL NOT NULL REFERENCES users(id),
    user_username VARCHAR(500) NOT NULL 
);

CREATE TABLE saved_pins (
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    image TEXT NOT NULL,
    user_id SERIAL NOT NULL REFERENCES users(id),
    original_post_id INT,
    collection_id SERIAL NOT NULL REFERENCES collections(id)
);

-- CREATE TABLE saved_pins (
--     id SERIAL NOT NULL PRIMARY KEY,
--     original_post_id INT,
--     collection_id SERIAL NOT NULL REFERENCES collections(id)
-- );

INSERT INTO users (username, password, email) VALUES ('Goop', 'Goop', 'goop@email.com');

ALTER TABLE users ALTER COLUMN username TYPE VARCHAR (500) NOT NULL;


INSERT INTO pins (title, description, image, user_id, user_username) VALUES ('First Pin', 'First Pin Desc', 'img', 1, 'goop');

INSERT INTO pins (title, description, image, user_id, user_username) VALUES ('Second Pin', 'Second Pin Desc', 'img', 2, 'buh');

UPDATE pins SET title = 'Update Multiple', description = 'Updated desc', img = '' WHERE id = 1;

INSERT INTO collections (title, description, user_id, user_username) VALUES ('First Collection', 'First collections desc', 1, 'goop');

INSERT INTO hashtags (tag, pin_id) VALUES ('hashtag', 1);


-- INSERT INTO saved_pins (title, description, image, original_post_id, collection_id) VALUES ('Second Pin')