# UserManagement-Backend
API Documentation

# Overview of this project
The built user backend system is a comprehensive API service that offers a range of functionalities for user management and data storage.Here's a brief description of its key features:

1. User Registration: The '/api/register' endpoint allows users to register by providing essential details such as username, email, password, full name, age and gender which gets stored in 'users' table. Upon successful registration, users receive a unique user ID and confirmation message.
2. Token Generation: The '/api/token' endpoint generates access tokens for users by using a hashing algorithm, which combines the secret key with other data. This token can be used to authenticate user requests to protected endpoints.
3. Storing Data: The '/api/data' endpoint enable users to store a key-value pairs in the 'data_store' table. Only authorized users with a valid access token can store the data.
4. Retrieving Data: The '/api/data/:key' enables authorized users to get the 'value' of corresponding 'key' mentioned in the GET request.
5. Update Data: The '/api/data/:key enables authorized users to update the 'value' of corresponding 'key' mentioned in the PUT request.
6. Delete Data: The '/api/data/:key enables authorized users to delete the 'key-value' pair by 'key' mentioned in the PUT request.

Overall, this backend system provides a secure and efficient way to manage user registration, authentication, and data storage. It's well-suited for scenarios where user accounts need to be managed alongside the storage and manipulation of associated data using a RESTful API architecture.

# Choice of framework
1. Node.js: It's used a runtime environment due to its non-blocking input-output model and scalibility. It allows asynchronous operations being single threaded in nature due to the working of event loop. Its event-driven architecture supports this API-centric application, allowing us to handle a high volume of concurrent requests efficiently.
2. Express.js: I used Express.js because of its lightweight and flexible web application framework. Its middleware-based approach enable user to create APIs quickly while maintaining customizability and a clear routing structure.
3. PostgreSQL: For the need of using a SQL database, I chose PostgreSQL due to its reliabilty, support for complex queries, ACID properies compliance, concurrency control, partitions and using strong security features. Its relational structure is well-suited for managing user data and key-value pairs efficiently.
4. JWT(JSON Web Token): After user registration, I have generated token for authorization and each time a user store, update or delete the data, a token verification step is done. This lightweight token-based authentication mechanism enhances the security of our API endpoints.
5. bcrypt: This is used for hashing the password so that when the database is accessed, the database is stored in a hashed format. This library ensures that user passwords are securely stored in the database by applying cryptographic hashing techniques, adding an extra layer of data protection.

Using these frameworks empowers us to develop a secure, performant, and scalable backend system that meets the project's requirements. Our backend system is well-structured, easy to maintain, and capable of delivering a seamless experience for users interacting with our APIs.

# Database schema
DB schema of two tables used are:
1. users Table:
   This table stores user registration information.
![WhatsApp Image 2023-08-12 at 17 37 23](https://github.com/Vinayak-innovator24/UserManagement-Backend/assets/63922686/c4dcd811-069d-41fc-8bbb-d23fd9466d2d)

2. data_store Table:
   This table stores key-value pairs of 
