## Create a course selling app

 - Initialize a new Node.js project
 - Add Express, jsonwebtoken, mongoose to it as a dependency 
 - Create index.js
 - Add route skeleton for user login, signup, purchase a course, sees all courses, sees the purchased courses course
 - Add routes for admin login, admin signup, create a course, delete a course, add course content.
 - Define the schema for User, Admin, Course, Purchase
 - Add a database (mongodb), use dotenv to store the database connection string
 - Add middlewares for user and admin auth
 - Complete the routes for user login, signup, purchase a course, see course (Extra points - Use express routing to better structure your routes)
 - Create the frontend


 Good to haves
  - Use cookies instead of JWT for auth
  - Add a rate limiting middleware
  - Frontend in ejs (low pri)
  - Frontend in React


  ## Two or more routes having same name:
  
  - At first glance, it looks like you’re “reusing” the same endpoint names — but actually, it’s not a conflict once you mount them under different base paths in your main index.js or app.js.
  - Each Router() acts as a mini isolated sub-application.
They only get a real path when you attach (mount) them to the main app with a base route.

```javascript
const express = require('express');
const app = express();
const { userRouter } = require('./routes/user');
const { adminRouter } = require('./routes/admin');

app.use('/user', userRouter);
app.use('/admin', adminRouter);

```
- userRouter	/user	/sign-up	/user/sign-up
- adminRouter	/admin	/sign-in	/admin/sign-in


### What Is Express Router?

👉 express.Router() is a mini-Express app — a separate instance of Express that you can use to:
define routes in a modular way,
group related routes together (e.g., all /user routes in one file),
then attach that group to the main app with a prefix like /api/v1/user.
In short:
It helps organize your routes cleanly, instead of putting everything in one giant index.js.