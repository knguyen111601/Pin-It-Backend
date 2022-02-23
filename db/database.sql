-- CREATE TABLE users (
--     id SERIAL NOT NULL PRIMARY KEY,
--     username VARCHAR(500) NOT NULL UNIQUE,
--     password VARCHAR(500) NOT NULL,
--     email TEXT NOT NULL UNIQUE,
--     pfp TEXT NOT NULL DEFAULT 'https://i.imgur.com/igF2kHr.png'
-- );

-- CREATE TABLE pins (
--     id SERIAL NOT NULL PRIMARY KEY,
--     title VARCHAR(500) NOT NULL,
--     description TEXT,
--     image TEXT NOT NULL,
--     user_id SERIAL NOT NULL REFERENCES users(id),
--     user_username VARCHAR(500) NOT NULL
--     user_pfp TEXT NOT NULL DEFAULT 'https://i.imgur.com/igF2kHr.png'
-- );

-- CREATE TABLE hashtags (
--     id SERIAL NOT NULL PRIMARY KEY,
--     tag VARCHAR(255) NOT NULL,
--     pin_id SERIAL NOT NULL REFERENCES pins(id)
-- );

-- CREATE TABLE collections (
--     id SERIAL NOT NULL PRIMARY KEY,
--     title VARCHAR(500) NOT NULL,
--     description TEXT, 
--     user_id SERIAL NOT NULL REFERENCES users(id),
--     user_username VARCHAR(500) NOT NULL 
-- );

-- CREATE TABLE saved_pins (
--     id SERIAL NOT NULL PRIMARY KEY,
--     title VARCHAR(500) NOT NULL,
--     description TEXT,
--     image TEXT NOT NULL,
--     user_id SERIAL NOT NULL REFERENCES users(id),
--     original_post_id INT,
--     collection_id SERIAL NOT NULL REFERENCES collections(id)
-- );

-- CREATE TABLE saved_pins (
--     id SERIAL NOT NULL PRIMARY KEY,
--     original_post_id INT,
--     collection_id SERIAL NOT NULL REFERENCES collections(id)
-- );

-- INSERT INTO users (username, password, email) VALUES ('Goop', 'Goop', 'goop@email.com');

-- ALTER TABLE users ALTER COLUMN username TYPE VARCHAR (500) NOT NULL;


-- INSERT INTO pins (title, description, image, user_id, user_username) VALUES ('First Pin', 'First Pin Desc', 'img', 1, 'goop');

-- INSERT INTO pins (title, description, image, user_id, user_username) VALUES ('Second Pin', 'Second Pin Desc', 'img', 2, 'buh');

-- UPDATE pins SET title = 'Update Multiple', description = 'Updated desc', img = '' WHERE id = 1;

-- INSERT INTO collections (title, description, user_id, user_username) VALUES ('First Collection', 'First collections desc', 1, 'goop');

-- INSERT INTO hashtags (tag, pin_id) VALUES ('hashtag', 1);


-- INSERT INTO saved_pins (title, description, image, original_post_id, collection_id) VALUES ('Second Pin')

-- ALTER TABLE saved_pins ADD user_username VARCHAR(500) NOT NULL;

-- nature
INSERT INTO pins (title, description, image, user_id, user_username, user_pfp) VALUES ('Nature is beautiful', 'What a beautiful place', 'https://i.imgur.com/GSChThp.jpg', 10, 'Kenny', 'https://i.imgur.com/AStszbh.jpg');
INSERT INTO pins (title, description, image, user_id, user_username, user_pfp) VALUES ('Loft Design Idea', 'What a beautiful loft', 'https://i.imgur.com/6tDO29X.jpg', 13, 'Sam', 'https://i.imgur.com/g4abZCc.jpg');

INSERT INTO pins (title, description, image, user_id, user_username, user_pfp) VALUES ('Pina Colada Strikes Back', 'What a beautiful drink', 'https://i.imgur.com/pWFVPbf.jpg', 10, 'Kenny', 'https://i.imgur.com/AStszbh.jpg');

INSERT INTO pins (title, description, image, user_id, user_username, user_pfp) VALUES ('Interior Design', 'What a beautifful room', 'https://i.imgur.com/oZux3dn.jpg', 10, 'Kenny', 'https://i.imgur.com/AStszbh.jpg');
INSERT INTO pins (title, description, image, user_id, user_username, user_pfp) VALUES ('Another Pina Colada', 'What a beautiful drink', 'https://i.imgur.com/o1UapCj.jpg', 12, 'Po', 'https://i.imgur.com/z23azA5.jpg');

INSERT INTO pins (title, description, image, user_id, user_username, user_pfp) VALUES ('Nature', 'What a beautiful place', 'https://i.imgur.com/L3dwy9i.jpg', 12, 'Po', 'https://i.imgur.com/z23azA5.jpg');
-- Interior Design

INSERT INTO pins (title, description, image, user_id, user_username, user_pfp) VALUES ('Art is amazing', 'What a beautiful piece', 'https://i.imgur.com/uSx9nBu.jpg', 13, 'Sam', 'https://i.imgur.com/g4abZCc.jpg');
-- Pina colada
INSERT INTO pins (title, description, image, user_id, user_username, user_pfp) VALUES ('Pina Colada', 'What a beautiful drink', 'https://i.imgur.com/xTDsvLV.jpg', 10, 'Kenny', 'https://i.imgur.com/AStszbh.jpg');
INSERT INTO pins (title, description, image, user_id, user_username, user_pfp) VALUES ('Pina Colada Returns', 'What a beautiful drink', 'https://i.imgur.com/nMGZ6aF.jpg', 13, 'Sam', 'https://i.imgur.com/g4abZCc.jpg');
-- Art
INSERT INTO pins (title, description, image, user_id, user_username, user_pfp) VALUES ('Very artistic', 'What a beautiful piece', 'https://i.imgur.com/Kw6fAY6.jpg', 10, 'Kenny', 'https://i.imgur.com/AStszbh.jpg');

INSERT INTO pins (title, description, image, user_id, user_username, user_pfp) VALUES ('Classic Art Piece', 'What a beautiful piece', 'https://i.imgur.com/TgBAbJm.jpg', 12, 'Po', 'https://i.imgur.com/z23azA5.jpg');
INSERT INTO pins (title, description, image, user_id, user_username, user_pfp) VALUES ('Nature is amazing', 'What a beautiful place', 'https://i.imgur.com/yEj8Hch.jpg', 13, 'Sam', 'https://i.imgur.com/g4abZCc.jpg');
INSERT INTO pins (title, description, image, user_id, user_username, user_pfp) VALUES ('The design', 'What a beautiful view', 'https://i.imgur.com/vi16yti.jpg', 12, 'Po', 'https://i.imgur.com/z23azA5.jpg');



-- Pina Colada


INSERT INTO pins (title, description, image, user_id, user_username, user_pfp) VALUES ('Pina Colada 2', 'What a beautiful drink', 'https://i.imgur.com/FbHTBKj.jpg', 12, 'Po', 'https://i.imgur.com/z23azA5.jpg');


INSERT INTO pins (title, description, image, user_id, user_username, user_pfp) VALUES ('Pina Colada One More Time', 'What a beautiful drink', 'https://i.imgur.com/hojEGT7.jpg', 13, 'Sam', 'https://i.imgur.com/g4abZCc.jpg');


