# simpleUserJson

REQUIRMENTS
Mongodb running locally, and node.js installed

import sample data using command ./mongoimport --db test --collection users --drop --jsonArray --file C:\downloads\users.json
https://gist.github.com/jasonmadigan/009c15b5dc4b4eccd32b

RUNNING

$ "npm install"

$ "node index.js"

-----------
#API Features

#List all Users (contains all fields)
GET http://localhost:8080/api/users/


#List all male users

GET http://localhost:8080/api/users/?user.gender=male


#Get all users in state of virginia

GET http://localhost:8080/api/users/?user.location.state=virginia


#Get specific user (using DB ID as identifier)

GET http://localhost:8080/api/users/57a073704fd73108517aed4e


#Create a new User  (provide new user in JSON in body)

POST http://localhost:8080/api/users/


#Update specific user  (with parameters as x-www-form-urlencoded)

Put http://localhost:8080/api/users/57a073704fd73108517aed4e  


#Delete specific user 

Delete http://localhost:8080/api/users/57a073704fd73108517aed4e 
