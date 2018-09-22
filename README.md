# Nodejs TODO List API
 This application is an absolute multi user’s online Todo management REST API built with NodeJS , ExpressJs  & Mongoose. It is a complete CRUD application that helps you manage your Todo List .

## Installation

1. Clone the repository :  git clone https://github.com/eliarms/node-todo-api
2. Add your mongodb **PORT** , **MONGODB_URI** and **JWT_SECRET** values in **/server/config/config-template.json** and save the file as **config.json** .

```This will allow you to have  differents environment settings.```

## Example of a config.json 

{
 
 "test": 
   {
    
      "PORT": 3000,
      
      "MONGODB_URI": "mongodb://localhost:27017/TodoAppTest",
      
      "JWT_SECRET": "abceced232435kbskjfb123123w9mrj3sdkjfkds
   },
   
  "development": 
   {
   
    "PORT": 3000,
    
    "MONGODB_URI": "mongodb://localhost:27017/TodoApp",
   
    "JWT_SECRET": "abceced232435kbskjfbsdkjf4290304kds"
 
 }
}

2. run ```npm install``` to install all the necessary **node_modules** for running the application.

2. Run ```npm start``` to start the application 

3. At this point the application is up and running, you can test the Endpoints using any restful clients like```Postman or Insomnia``` .

## How does it works ?
If you are running the application for the first time , you need to create a new user by making a POST request to the  ```/user```  endpoint together with the email and password in a json format. The application will generate a unique X-Auth token that needs to be included in the headers before accessing any TODO'S enpoints.

**Example**

```POST --> http://localhost:3000/users/```

**Body**
{
	"email":"youremail@gmail.com",
	"password":"password!"
}

## Available Endpoints

| Endpoints  | Request Type | Description
| ---------- | ---- | ---------- |
| `/user`  | **POST**  | Creates a new user with the specified email and password and generates a unique ```X-Auth``` header
| `/user/login`  | **POST**  | Logs in a user with the specified email and password credentials and generates a unique ```X-Auth``` header
| `/user/me/token` | **DELETE** | Logs out the current user with the specified ```X-Auth``` header.
| `/user/me` | **GET** | Retrieves info about the current user logged in. You need to provide the unique  ```X-Auth``` token in the header, else the application will return a ```401 Unauthorized``` HTTP ERROR CODE
| `/todos` | **GET** | Retrieves all of the user's current todos
| `/todos/id` | **GET** | Retrieves a single todo with the specified **id**
| `/todos` | **POST** | Creates a new todo with the specified **text** and **completed** (true or false) status. 
| `/todos/id` | **DELETE** | Deletes a single todo with the specified **id**
| `/todos/id` | **PATCH** | Updates a single todo with the specified **text** and **completed** status



## How to Contribute ?
1. Fork it (<https://github.com/eliarms/node-todo-api/fork>)
2. Create your feature branch (`git checkout -b feature/mocha`)
3. Commit your changes (`git commit -am 'Added some test cases'`)
4. Push to the branch (`git push origin feature/mocha`)
5. Create a new Pull Request

