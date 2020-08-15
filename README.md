# Blog Rest API
> API is built with nodeJS, expressJS and mongodb.
## Features
> CRUD (Create, Read, Update, Delete)
- Authentication With JWT (Reset Password with Email)
  - Register(User)
  - Login
  - Logout
  - Read Profile
  - Forgot Password
- Blog
  - Create Post
  - Edit Post
  - Read Post
  - Delete Post
  - Add Comment
  - Edit Comment
  - Delete Comment
- Audit Table
  - Logs all events
  - csv response
## API Documentation
- Extensive and Testing Documentation with Postman : [Postman Documentation](https://documenter.getpostman.com/view/12366457/T1LPESe8?version=latest)
## Database Models
- User
- Post
  - Comment
- Table (For Audit Table)
## Requirements
- NODEJS
- MONGODB
## Configuration File
Create a file **.env** in the root of the project and then set your environment variables.
```
PORT=3000
JWT_SECRET=blogo
NODEMAILER_EMAIL=xyz@gmail.com
NODEMAILER_PASSWORD=xyz
```
Nodemailer is used for email service.(Turn on access to less secure apps from security in your email and turn off 2-Step Verification.)
## Installation
Install all npm dependencies
```
npm install
```
Install nodemon globally
```
npm install -g nodemon
```
## Start web server
```
npm run dev
```
