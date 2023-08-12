# Project Title: UserManagement-Backend

# Overview of this project:
The built user backend system is a comprehensive API service that offers a range of functionalities for user management and data storage.Here's a brief description of its key features:

1. User Registration: The '/api/register' endpoint allows users to register by providing essential details such as username, email, password, full name, age and gender which gets stored in 'users' table. Upon successful registration, users receive a unique user ID and confirmation message
2. Token Generation: The '/api/token' endpoint generates access tokens for users by using a hashing algorithm, which combines the secret key with other data. This token can be used to authenticate user requests to protected endpoints
3. Storing Data: The '/api/data' endpoint enable users to store a key-value pairs in the 'data_store' table. Only authorized users with a valid access token can store the data
4. Retrieving Data: The '/api/data/:key' enables authorized users to get the 'value' of corresponding 'key' mentioned in the GET request
5. Update Data: The '/api/data/:key enables authorized users to update the 'value' of corresponding 'key' mentioned in the PUT request
6. Delete Data: The '/api/data/:key enables authorized users to delete the 'key-value' pair by 'key' mentioned in the PUT request

Overall, this backend system provides a secure and efficient way to manage user registration, authentication, and data storage. It's well-suited for scenarios where user accounts need to be managed alongside the storage and manipulation of associated data using a RESTful API architecture

# Choice of framework:
1. Node.js: It's used a runtime environment due to its non-blocking input-output model and scalibility. It allows asynchronous operations being single threaded in nature due to the working of event loop. Its event-driven architecture supports this API-centric application, allowing us to handle a high volume of concurrent requests efficiently
2. Express.js: I used Express.js because of its lightweight and flexible web application framework. Its middleware-based approach enable user to create APIs quickly while maintaining customizability and a clear routing structure
3. PostgreSQL: For the need of using a SQL database, I chose PostgreSQL due to its reliabilty, support for complex queries, ACID properies compliance, concurrency control, partitions and using strong security features. Its relational structure is well-suited for managing user data and key-value pairs efficiently
4. JWT(JSON Web Token): After user registration, I have generated token for authorization and each time a user store, update or delete the data, a token verification step is done. This lightweight token-based authentication mechanism enhances the security of our API endpoints
5. bcrypt: This is used for hashing the password so that when the database is accessed, the database is stored in a hashed format. This library ensures that user passwords are securely stored in the database by applying cryptographic hashing techniques, adding an extra layer of data protection

Using these frameworks empowers us to develop a secure, performant, and scalable backend system that meets the project's requirements. Our backend system is well-structured, easy to maintain, and capable of delivering a seamless experience for users interacting with our APIs

# Database schema:
DB schema of two tables used are:
1. users Table:
   This table stores user registration information
![WhatsApp Image 2023-08-12 at 17 37 23](https://github.com/Vinayak-innovator24/UserManagement-Backend/assets/63922686/c4dcd811-069d-41fc-8bbb-d23fd9466d2d)

2. data_store Table:
   This table stores key-value pairs of registered users

![WhatsApp Image 2023-08-12 at 17 34 50](https://github.com/Vinayak-innovator24/UserManagement-Backend/assets/63922686/3027012c-ac4c-42c4-b94d-6b9c4085a3fb)

The 'user_id' in the 'data_store' table references the 'user_id' in the 'users' table, establishing a relationship between users and their stored data

This schema allows the system to store user registration details in the 'users' table and manage key-value pairs in the data_store table. Each key-value pair is associated with a specific user using the 'user_id'

# Instructions to run the code:
To run the backend system consisting of API endpoints using Docker Compose, I have followed these instructions:

1. Docker Compose Setup: installed Docker Compose on my system

2. Environment Variables: Created a `.env` file in the root directory of the project to store environment variables.       
   Included the necessary configuration details like database credentials, JWT secret, PORT no, etc. For example:

   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=your_db_host
   DB_PORT=5432
   DB_DATABASE=your_db_name
   JWT_SECRET=your_jwt_secret
   PORT=3000

3. Docker Compose File: Created a `docker-compose.yml` file in the root directory to define the services required for the backend system. Here's a sample `docker-compose.yml` file:

   version: '3'
   
   services:
     backend:
       build:
         context: .
         dockerfile: ./Dockerfile
       ports:
         - '3000:3000'
      environment:
         NODE_ENV: production
         DB_USER: ${DB_USER}
         DB_HOST: ${DB_HOST}
         DB_DATABASE: ${DB_DATABASE}
       env_file:
         - .env
       depends_on:
         - db

     db:
       image: postgres:13
       environment:
         POSTGRES_USER: ${DB_USER}
         POSTGRES_PASSWORD: ${DB_PASSWORD}
         POSTGRES_DB: ${DB_DATABASE}

4. Build and Run with Docker Compose: Executed the following command in the root of the project directory to build and run the Docker containers defined in the `docker-compose.yml` file:

   Build command: docker compose build
   Run command: docker compose up

   This command will build the backend image based on the dockerfile, set up the PostgreSQL database container, and link    
   them together

5. Accessing & running all the API endpoints: All the API endpoints are now accessible at `http://localhost:{PORT}` on the local machine. We can perform all the operations on Postman one by one and make changes to the remote database managed by docker

6. Shut Down the Containers: Running 'docker compose down' command for shutting down the services and removing the containers

# Instructions to setup the code:
This is a long process of preparing the environment, configurations, and dependencies required to run the code effectively. This phase includes configuring databases, installing dependencies, setting environment variables, and other necessary setup tasks

1. Setting the node environment: Running 'npm init -y' command to generate package.json without any questions
   package.json file looks like this:
    {
     "name": "dpdzero-assignment",
     "version": "1.0.0",
     "description": "",
     "main": "server.js",
     "scripts": {
       "start": "node server.js"
     },
     "author": "",
     "license": "ISC"
   }

2. Installing express: Running 'npm install express' to install express dependency. This will add express to a folder called node_modules in the root project folder

3. Create a new file naming 'server.js' in which the server is set and made to run. The steps are:
   (i) Importing the express dependency just installed:
       const express = require('express');
   (ii) Create an instance of of Express app object:
        const app = express();
   (iii) listening port is set up for the server. This is what sits and waits for an incoming 
        connection, and in Express apps, it is kept always at the end of the file:

         app.listen(port, () => {
             console.log(`Now listening on port ${port}`);
         }); 
4. Installing several dependencies like pg, pg-pool, jsonwebtoken, express, dotenv, bcryptjs and development dependency        like nodemon to restart the server as we make changes automatically. I have used pg and pg-pool for PostgreSQL database.
   dotenv is used for creating .env file in the root directory of the project and importing form there. bcrypt is used for     hashing the password stored in database for its security purposes. jsonwebtoken is used for generating web tokens for 
   authorizing the user for other actions. Once the user is logged in, each subsequent request will include the JWT, 
   allowing the user to access routes, services, and resources that are permitted with that token.

5. Connecting the database:

   // PostgreSQL database configuration
   const pool = new Pool({
      user: 'your_db_user',
      host: 'your_db_host',
      database: 'your_db_name',
      password: 'your_db_password',
      port: 5432, // Default PostgreSQL port
   });

6. Setting up different routes, each ones having some modifications with respect to root route ('/'):
   The app object contains several functions for routing requests, based on HTTP methods, the most common of these             functions are:
      1. app.get()
      2. app.post()
      3. app.put()
      4. app.delete()
  
7. Used Postman to check the endpoints:
   
   ![Screenshot (98)](https://github.com/Vinayak-innovator24/UserManagement-Backend/assets/63922686/e0dd673e-f9bd-429f-bd2a-27d8d7c687b6)
   
   ![Screenshot (99)](https://github.com/Vinayak-innovator24/UserManagement-Backend/assets/63922686/c786c7df-cae7-4a3c-9f6c-780a17e898c3)

   ![Screenshot (100)](https://github.com/Vinayak-innovator24/UserManagement-Backend/assets/63922686/c7b9d78a-11ca-4034-92a8-1b9d5d901580)

   ![Screenshot (101)](https://github.com/Vinayak-innovator24/UserManagement-Backend/assets/63922686/14835135-7c0d-43e9-899c-3db229cdfc5f)

   ![Screenshot (102)](https://github.com/Vinayak-innovator24/UserManagement-Backend/assets/63922686/d556121d-52e0-41b5-8677-4d8b413d823a)

   ![Screenshot (103)](https://github.com/Vinayak-innovator24/UserManagement-Backend/assets/63922686/5fac8d71-189c-48fa-8229-1be82d4947d1)

# Conclusion:
I've successfully set up and explored the backend system consisting of APIs like user registration, token generation, data storage, retrieval, updates, and deletions. This README has been prepared for a comprehensive guide on how to run, set up, and deploy the system using Docker Compose.

By following these instructions to make this project, I've gained insights into using technologies like Node.js, Express, PostgreSQL, and Docker to build and manage a robust API-driven application. This project serves as a valuable foundation for expanding my skills and creating more complex applications in the future.

Thank You
# Vinayak Pandey
