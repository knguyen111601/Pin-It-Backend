# Pin-it API
#### by Kenny Nguyen 

## Project Summary

Pin-It is a web application in which users can let their imagination and passions run wild. Pin-it allows users to have full CRUD capabilities for their own personal pins and collections. Users can post their pins publicly and share them with others. Also, they are able to add any pins to collections that they've created.

## List of Technologies 
1. Node.js
2. Express
3. Postgres
4. SQL
5. bcrypt

## Models
Models I will have in my app are:

### Users Model
| Column | Description |
|-----|-----|
| id | Serial Primary Key | 
| username | Personalized username | 
| password | Password hashed utilizing bcrypt |
| email | Email of user |
| pfp | Personalized profile picture |

### Pins Model
| Column | Description |
|-----|-----|
| id | Serial Primary Key | 
| title | Personalized title for pin | 
| description | Description of pin |
| image | Image for pin |
| user_id | SERIAL Foreign Key to users(id) |
| user_username | VARCHAR(500) Foreign Key to users(id) |
| user_pfp | TEXT Profile Picture |

### Hashtags Model
| Column | Description |
|-----|-----|
| id | Serial Primary Key | 
| tag | VARCHAR(500) |
| pin_id | SERIAL Foreign Key to pins(id) |

### Collections Model
| Column | Description |
|-----|-----|
| id | Serial Primary Key | 
| title | VARCHAR(500) |
| description | TEXT |
| user_id | SERIAL Foreign Key user(id) |
| user_username | VARCHAR(500) | 

### Saved_Pins Model
| Column | Description |
|-----|-----|
| id | Serial Primary Key | 
| title | Personalized title for pin | 
| description | Description of pin |
| image | Image for pin |
| user_id | SERIAL Foreign Key to users(id) |
| user_username | VARCHAR(500) Foreign Key to users(id) |
| user_pfp | Text Foreign Key to users(id) |
| original_post_id | SERIAL Foreign Key pin(id) |
| collection_id | SERIAL Foreign Key collection(id) |


## Endpoints

### User Routes
| url | method | action |
|-----|--------|--------|
| /user | get | get all users |
| /user/signup | post | creates user |
| /user/login | post | logs in and gets token |
| /user/:id | put | edit username and pfp |

### Pins Routes
| url | method | action |
|-----|--------|--------|
| /pins | get | get all users |
| /pins/:id | get | get particular |
| /pins | post | create pin |
| /pins/:id | put | edit pin |
| /pins/:id | delete | deletes pin | 

### Collections Routes 
| url | method | action |
|-----|--------|--------|
| /collections | get | get all collections |
| /collections/:id | get | get particular |
| /collections | post | create collections |
| /collections/:id | put | edit collections |
| /collections/:id | delete | deletes collection | 

### Saved_Pins Routes
| url | method | action |
|-----|--------|--------|
| /savedpins | get | get all users |
| /savedpins/:id | get | get particular |
| /savedpins | post | create pin |
| /savedpins/:id | put | edit pin |
| /savedpins/:id | delete | deletes pin | 

