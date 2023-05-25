# JusChat App (Backend)

Pursuit 9.4 Cohort, Module 4 - Full-Stack Portfolio Project

[Backend deployed on render](https://juschat-backend.onrender.com/)

---

### Technologies Used

* JavaScript
* Express
* PostgreSQL
* NPM (dotenv, nodemon, cors, pg-promise)
* Postman

---

## Backend Routes

- ### Users:

|  #  | Action  | HTTP Verb |    CRUD    |              Description              | URL                 |
| :-: | :-----: | :-------: | :--------: | :-----------------------------------  | :-----              |
|  1  |  Index  |    GET    |    Read    | Get all users                         | /users              |
|  2  |  Show   |    GET    |    Read    | Get an individual user by username    | /users/:username    |
|  3  | Create  |   POST    |   Create   | Create a new user                     | /users              |
|  4  | Destroy |  DELETE   |   Delete   | Delete an user                        | /users/:username    |
|  5  | Update  |    PUT    |   Update   | Update/Edit an user                   | /users/:username    |

- ### Chatrooms:

|  #  | Action  | HTTP Verb |    CRUD    |              Description             | URL                    |
| :-: | :-----: | :-------: | :--------: | :----------------------------------- | :-----                 |
|  1  |  Index  |    GET    |    Read    | Get all chatrooms                    | /chatrooms             |
|  2  |  Index  |    GET    |    Read    | Get all the members of a chatroom    | /chatrooms/:id/members |
|  3  |  Show   |    GET    |    Read    | Get an individual chatroom by id     | /chatrooms/:id         |
|  4  | Create  |   POST    |   Create   | Create a new chatroom                | /chatrooms             |
|  5  | Destroy |  DELETE   |   Delete   | Delete a chatroom                    | /chatrooms/:id         |
|  6  | Update  |    PUT    |   Update   | Update/Edit a chatroom               | /chatrooms/:id         |

- ### Members:

|  #  | Action  | HTTP Verb |    CRUD    |              Description              | URL                  |
| :-: | :-----: | :-------: | :--------: | :-----------------------------------  | :-----               |
|  1  |  Index  |    GET    |    Read    | Get all members                       | /members             |
|  2  |   Show  |    GET    |    Read    | Get all members of a chatroom         | /members/:chatroomId |
|  3  | Create  |   POST    |   Create   | Create a new member                   | /members             |
|  4  | Destroy |  DELETE   |   Delete   | Delete a member                       | /members/:id         |
|  5  | Update  |    PUT    |   Update   | Update/Edit a member                  | /members/:id         |

- ### Messsages:

|  #  | Action  | HTTP Verb |    CRUD    |              Description             | URL                   |
| :-: | :-----: | :-------: | :--------: | :----------------------------------- | :-----                |
|  1  |  Index  |    GET    |    Read    | Get all messages                     | /messages             |
|  2  |  Show   |    GET    |    Read    | Get all messages of a chatroom       | /messages/:chatroomId |
|  3  | Create  |   POST    |   Create   | Create a new message                 | /messages             |
|  4  | Destroy |  DELETE   |   Delete   | Delete a message                     | /messages/:id         |
|  5  | Update  |    PUT    |   Update   | Update/Edit a message                | /messages/:id         |
