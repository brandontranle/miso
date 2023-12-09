export {};
const express = require('express');
const dotenv = require('dotenv');
const moment = require('moment-timezone');

const request = require('request');
const { createProxyMiddleware } = require('http-proxy-middleware');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config({ path: './auth.env' });
const cron = require('node-cron');

const jwt = require('jsonwebtoken');
const session = require('express-session');


cron.schedule('* * * * *', async () => {
  try {
    const currentTime = Date.now();

    // Find and delete OTP verification records that have expired
    await UserOTPVerification.deleteMany({ expiresAt: { $lt: currentTime } });

    //console.log('Expired OTP verification records deleted.');
  } catch (error) {
    //console.error('Error deleting expired OTP verification records:', error);
  }
});


//email handler
const nodemailer = require('nodemailer');

//console.log('AUTH_EMAIL:', process.env.AUTH_EMAIL);
//console.log('AUTH_PASS:', process.env.AUTH_PASS);
//console.log('JWT_SECRET:', process.env.JWT_SECRET)


const jwtSecret = process.env.JWT_SECRET;


const app = express();
const port = process.env.PORT || 5000;
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));








//spotify authentication
global.access_token = ''
global.refresh_token = ''
dotenv.config()

var spotify_redirect_uri = 'http://localhost:5000/auth/callback'
var spotify_client_id = process.env.SPOTIFY_CLIENT_ID
var spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET
var spotify_refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

app.use(bodyParser.json());
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your React app's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};


module.exports = function (app) {
  app.use('/auth', createProxyMiddleware({ 
    target: 'http://localhost:5000',
    changeOrigin: true,
    pathRewrite: {
      '^/auth': '', 
    },
  }));
};


//generates a random string for security 
var randomString = function (length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for(var i = 0; i < length; i++){
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}


// token authorization (spotify)


//email transporter

var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "34b585de5a86ea",
    pass: "12a2b0193b9faa"
  },
  tls: {
    rejectUnauthorized: false,
},
});

transporter.verify((error, success)=>{
  if(error){
console.log(error);
console.log("error occured at 193");
  }
  else{
      console.log("Ready for message");
      console.log(success);
  }

});



/* Authentication token to check if a user is logged in at a given moment */
app.use(
  session({
    secret: jwtSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false},
  })
);

app.use(cors(corsOptions));

// Connect to MongoDB
//Mongo Version: 6.0.1: mongodb://127.0.0.1:27017/auth ~ use this command make sure to install node.js 18.18.10 (LTS)
mongoose.connect('mongodb://127.0.0.1:27017/auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(error => {
  console.error('MongoDB connection error:', error);
});

// Define User model
const User = mongoose.model('User', {
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  verified: Boolean,
});

const UserData = mongoose.model('UserData', {
  userId: String,
  todos: [{ text: String, complete: Boolean, id: String, }], // Add this field
  todosHistory: [{ text: String, complete: Boolean, id: String, }], // Add this field
  time: Number,
  kibbles: Number,
  weeklyTime: {
    sunday: Number,
    monday: Number,
    tuesday: Number,
    wednesday: Number,
    thursday: Number,
    friday: Number,
    saturday: Number,
  },
  timezone: String,
  notebooks: [{text: String, notebookId: String, title: String}],
  bio: String,
  image: String,
  wallpaper: String,
  createdAt: Date,
})


//Define UserOTPVerification model
const UserOTPVerification = mongoose.model('UserOTPVerification', {
  userId: String,
  otp: String,
  createdAt: Date,
  expiresAt: Date,
});

// Handle sign-up request
app.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  /*
  let re =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;
  const isEmailValid = re.test(email);

  if (!isEmailValid) {
    return res.status(400).json({ error: 'Invalid email format' });
  }*/


  // Check if email already exists
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    console.error('Sign-up error:', 'Email already exists')
    return res.status(400).json({ error: 'Email already exists' });
  }

  //verify first before hashing the password and inserting into database. 
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({firstName, lastName, email, password: hashedPassword, verified: false, createdAt: new Date() // This will store the current date and time
    // Add this field
  });
    const savedUser = await newUser.save();
    //Handle account verification
  //sendVerificationEmail(result, res);

  // Create UserData document for the user
  const userData = new UserData({
    _id: savedUser._id, // Use the same ID as the user's ID
    userId: savedUser._id.toString(), // Use the user's ID as the userId
    todos: [{ text: "Create your first task!", complete: false, id: "12345" }],
    todosHistory: [],
    time: 0,
    kibbles: 0,
    notebooks: [{text: "", notebookId: "1", title: "my notebook"}],
    weeklyTime: {
      sunday: 0,
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 0,
    },
    timezone: "America/Los_Angeles",
    bio: "I am a new user!",
    createdAt: Date.now(),
    // Add other user-specific data if needed
  }, { timestamps: true });

  await userData.save();

    sendVerificationEmail(savedUser, res);
    res.status(201).json({ message: 'User registered successfully', userId: savedUser._id.toString()});
  } catch (error) {
    console.error('Sign-up error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




app.post('/getTodos', async (req, res) => {
  try {
    const { userId } = req.body; // Include 'page' parameter for pagination
    console.log("User ID: " + userId);

    // Define the number of tasks to return per page

    // Fetch the user's todos based on the userId
    const user = await UserData.findOne({ userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const todos = user.todos; // Ensure there are todos
    console.log("All Todos Count: " + todos.length);

    // Calculate the start and end indices for pagination

    // Get the subset of todos for the current page

    console.log("Retrieved!");

    res.status(200).json({ todos: todos });
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'An error occurred while fetching todos' });
  }
});





const sendVerificationEmail = async ({_id, email}, res) => {
  try{
    //generate an OTP (One-time-password verification code)
    const otp = Math.floor(1000 + Math.random() * 9000);
    console.log("(for testers and developers) this is your verification code: " + otp);
 
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: 'Miso - Email Verification (OTP)',
      html: '<p> Please enter the OTP: ' + otp + ' to verify your email address and complete your regristration for Miso!</p>',

    };
    
      const saltRounds = 10;
    const hashedOTP = await bcrypt.hash(otp.toString(), saltRounds);
    console.log('Generated OTP:', hashedOTP);


    const newOTPVerification = await new UserOTPVerification({
      userId: _id,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 600000, //expires in 10 minutes
    });

    //save otp record
    await newOTPVerification.save();
    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
    
  
  } catch (error){
    console.error('Email verification error:', error);
  }

}

app.post('/logout', (req, res) => {
  if (req.session) {
    console.log('logging out...');
    // Destroy the server-side session
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send('Could not log out, please try again');
      } else {
        res.status(200).send('Logout successful');
      }
    });
  } else {
    res.status(200).send('Logout successful');
  }
});


app.post('/sendOTP', async(req, res) => {

  try{
    let {email, userId} = req.body;

    if (!userId || !email){
      throw Error('User ID and email are required');

    } else {
      await  UserOTPVerification.deleteMany({userId});
      sendVerificationEmail({_id:userId, email}, res);
      res.status(200).json({ message: 'Email successfully resent' }); // Add this line

    }

  } catch (error){
    console.error('Resend OTP verification error:', error);
    res.status(500).json({ error: 'An error occurred while resending OTP' });

  }


});


app.post('/getDate', async(req, res) => { 

  try {
    const {userId} = req.body;
    const user = await UserData.findById(userId);

    if (!user) {
      res.status(404).json("user not found");
    }

    if (!user.createdAt){
      console.log("not found???");
      user.createdAt = new Date();
      await user.save();
    }

    console.log("date of member retrieved!")
    res.status(200).json({createdAt: user.createdAt});
  } catch (error) { 
    console.log("failed to retrieve the date: " + error);
    res.status(500).json("failed to retrieve the date");
  }

});

app.post('/getUser', async(req, res) => {
  
  try {
    const {userId} = req.body;

    const user = await User.findOne({_id: userId});

    if (!user) {
      res.status(404).json("user not found");
    }

     res.status(200).json({ userId: userId, name: user.firstName });
  } catch (error) {
    res.status(500).json("getUser request failed")
  }
  
});


app.post('/verifyOTP', async(req, res) => {
try{
  let { userId, otp } = req.body;

  if (!userId || !otp) {
    console.log('Verify ID:', userId);
    console.log('Verify Status:', otp);
    
    throw Error('User ID and OTP are required');
  } else{

    //const objectIdUserId = mongoose.Types.ObjectId(userId); // Convert to ObjectId

    const UserOTPVerificationRecords = await UserOTPVerification.find({
      userId,
    })
    if (UserOTPVerificationRecords.length === 0) {
      throw new Error('Invalid user ID');
    } else {
      const {expiresAt} = UserOTPVerificationRecords[0];
      const hashedOTP = UserOTPVerificationRecords[0].otp;

      if (expiresAt < Date.now()){
        //user otp record has expired
        await UserOTPVerification.deleteMany({userId});
        return res.status(400).json({ error: 'OTP has expired, please request again' });
      } else{
       const validOTP = await bcrypt.compare(otp, hashedOTP);

        if (!validOTP){
          return res.status(400).json({ error: 'Invalid code passed, Check your inbox.' });
        } else {
          await User.updateOne({_id: userId}, {verified: true});
          await UserOTPVerification.deleteMany({userId: userId});

          //fetch the name of the user to be returned later
          const response = await User.findOne({_id: userId});

          console.log('User has been verified');
          return res.status(200).json({ message: 'User email has been verified', userId: userId, name: response.firstName });
        }

      }
    }

  }
  } catch (error) {
    console.error('OTP verification error:', error);
        res.status(500).json({ error: 'An error occurred during OTP verification' });

}

})


app.post('/resendOTPVerification', async(req, res) => {

  try{
    let {userId, email} = req.body;

    if (!userId || !email){
      throw Error('User ID and email are required');

    } else {
      await  UserOTPVerification.deleteMany({userId});
      sendVerificationEmail({_id:userId, email}, res);
      res.status(200).json({ message: 'Email successfully resent' }); // Add this line

    }

  } catch (error){
    console.error('Resend OTP verification error:', error);
    res.status(500).json({ error: 'An error occurred while resending OTP' });

  }


});



const requireAuth = (req, res, next) => {
  const token = req.session.token;

  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        console.error('JWT verification error:', err);
        return res.status(401).json({ error: 'Unauthorized' });
      }
      req.userId = decodedToken.userId;
      next();
    });
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};


app.post('/login', async (req, res) => {

  const { email, password } = req.body;

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (!existingUser) {
    console.error('Login error:', 'Email does not exist')
    return res.status(400).json({ error: 'Email does not exist' });
  }

  const validPassword = await bcrypt.compare(password, existingUser.password);
  if (!validPassword) {
    console.error('Login error:', 'Password is incorrect')
    return res.status(400).json({ error: 'Password is incorrect' });
  }


  /*if the user successfully logins, generate a token and store it in the session*/
  const token = jwt.sign({ userId: existingUser._id }, jwtSecret, { expiresIn: '1h' });
  
  req.session.token = token;
  
  req.session.userId = existingUser._id.toString(); // Set userId in the session 

  console.log('Your token is: ', token);
  //retrieve first name from logged in user
  const { firstName } = existingUser;
  console.log('First name is: ', firstName);

  console.log('Your id is:', existingUser._id.toString());

  res.status(200).json({ message: 'Login successful', name: firstName, userId: existingUser._id.toString(), token: token });

})


app.get('/verifyStatus', async (req, res) => {
  const { email } = req.query; // Assuming you pass the email as a query parameter

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      console.error('Verify Status error:', 'User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('Verify Status:', user.verified);
    console.log('Verify ID from /verifyStatus:', user._id.toString());
    res.status(200).json({ isVerified: user.verified, userId: user._id.toString() });
  } catch (error) {
    console.error('Verify Status error:', (error as any).message);
    res.status(500).json({ error: 'An error occurred while checking verification status' });
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) {
      return res.status(401).send('No token provided');
  }

  jwt.verify(token, jwtSecret, (err, user) => {
      if (err) {
          return res.status(403).send('Invalid token');
      }
      req.user = user;
      next();
  });
};


app.post('/changePassword', async (req, res) => {

  try {
    const {userId, currentPassword, newPassword} = req.body;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json("user not found");
    }

    //compare the current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect current password" });
    }

    //hash and store the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    console.log("Password updated for user ID: " + userId);
    res.status(200).json({message: "Password updated!"});
  } catch (error) {
    res.status(500).json("failed to change password")
  }


});

//this is intended to change the email of a user who has already been registered to the database
app.post('/changeEmailRegistered', async (req, res) => {
  try {


  } catch (error) {


  }
});





app.post('/changeEmail', async (req, res) => {
  
  try {
    const { userId, newEmail } = req.body;


  //check for duplicate email, not allowed to change email to already existing email
  const existingUser = await User.findOne({ email: newEmail.toLowerCase() });
  if (existingUser) {
    console.error('Change Email Error:', 'Email already exists')
    return res.status(400).json({ error: 'You cannot change your email to one that does not belong to you!' });
  }

    let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  /*Validate email and password here*/
  const isEmailValid = re.test(newEmail);

  if (!isEmailValid) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  console.log("id:" + userId);

  const updatedUser = await User.findByIdAndUpdate(userId, { email: newEmail.toLowerCase() }, { new: true } // This option returns the updated document
  );


  if (!updatedUser) {
    console.error('Change email error:', 'User not found');
    return res.status(404).json({ error: 'User not found' });
  }

  console.log('User email updated:', updatedUser.email);

  await UserOTPVerification.deleteOne(
    { userId: userId },
    { sort: { createdAt: 1 } } // Sort in ascending order (oldest first)
  );




  sendVerificationEmail(updatedUser, res);
  console.log(updatedUser.email);
  res.status(200).json({ message: 'Email changed successfully' });
} catch (error) {
  console.error('Change email error:', (error as any).message);
  res.status(500).json({ error: 'An error occurred while changing the email' });
}
});




app.post('/addTodo', async (req, res) => {
  try {
    const { userId, todo } = req.body;

    console.log("User ID: " + userId);
    console.log("New Todo: " + todo);


    // Fetch the user's existing todos from the database
    const user = await UserData.findOne({userId});
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user's todos with the new todo
    user.todos.push(todo);
    await user.save();
    console.log("Updated with task: " + user.todos)

    // Return the updated todos list
    res.status(200).json({ todos: user.todos });
  } catch (error) {
    console.error("Error adding todo:", error);
    res.status(500).json({ error: "An error occurred while adding the todo" });
  }
});

app.post('/deleteTodo', async (req, res) => {
console.log("inside of todo request!");
  try{
    const {userId, todoId} = req.body;

    console.log("User ID: " + userId);
    console.log("Todo to delete: " + todoId);

    const user = await UserData.findOne({userId});
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ error: "User not found" });
    }


    //grab the todo by id
    const todo = user.todos.find((todo) => todo.id === todoId);
    if (!todo) {
      console.log("Todo not found");
      return res.status(404).json({ error: "Todo not found" });
    }

    //add the todo to the user history table
    user.todosHistory.push(todo);

    // Delete task
    //user.todos.pull(todoId);
    user.todos = user.todos.filter((todo) => todo.id !== todoId);
    await user.save();

    console.log("Updated with task: " + user.todos)
    

    //save the deleted task into the history table
    console.log("History updated!");

  //console log the updated array size
  /* fill this in */

  // Return the updated todos list
  res.status(200).json({ todos: user.todos });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "An error occurred while deleting the todo" });
  }
  });


  app.post('/updateTodo', async (req, res) => {

    try{
      const {userId, todoId, todoStatus} = req.body;
      const user = await UserData.findOne({userId});
      if (!user) {
        console.log("User not found");
        return res.status(404).json({ error: "User not found" });
      }

      //grab the todo by id
      const todo = user.todos.find((todo) => todo.id === todoId);
      if (!todo) {
        console.log("Todo not found");
        return res.status(404).json({ error: "Todo not found" });
      }

      //update the todo status
      todo.complete = todoStatus;
      console.log("updated todo status from the backend!");
      await user.save();
      return res.status(200).json({ todos: user.todos });
    }
    catch (error){
      console.error("Error updating todo:", error);
      res.status(500).json({ error: "An error occurred while updating the todo" });

    }

  });





  // Add this route to your Express app

app.post('/loadMoreTasks', async (req, res) => {
  try {
    const { userId, currentPage, itemsPerPage } = req.body;

    // Fetch the user's todos based on the userId
    const user = await UserData.findOne({ userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Calculate the start and end indices for pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Retrieve the tasks for the current page
    const tasksForPage = user.todos.slice(startIndex, endIndex);

    // Check if there are more tasks
    const hasMoreTasks = endIndex < user.todos.length;

    res.status(200).json({ tasks: tasksForPage, hasMore: hasMoreTasks });
  } catch (error) {
    console.error('Error loading more tasks:', error);
    res.status(500).json({ error: 'An error occurred while loading more tasks' });
  }
});


app.post('/getTotalTodos', async (req, res) => {
  try {
    const { userId } = req.body;

    // Fetch the user's todos based on the userId
    const user = await UserData.findOne({ userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const totalTodos = user.todos.length; // Get the total count of todos
    console.log("Total Todos:", totalTodos);

    res.status(200).json({ total: totalTodos });
  } catch (error) {
    console.error('Error fetching total todos:', error);
    res.status(500).json({ error: 'An error occurred while fetching total todos' });
  }
});

app.post('/editTodo', async (req, res) => {
  const { userId, todoId, newText } = req.body;

  try {
      // Assuming the Todo model has a userId and an id field
      // and you are updating the 'text' field of the todo
      const user = await UserData.findOne({userId});
      if (!user) {
        console.log("User not found");
        return res.status(404).json({ error: "User not found" });
      }

      const todo = await user.todos.find(todo => todo.id === todoId) 
      if (!todo) {
        console.log("Todo not found");
        return res.status(404).json({ error: "Todo not found" });
      }

      todo.text = newText;
      await user.save();

      res.status(200).json({ message: 'Todo updated successfully', todo: todo.text });
      }
   catch (error) {
      console.error('Error updating todo:', error);
      res.status(500).json({ message: 'Error updating todo' });
  }
});


app.post('/getDeletedTodos', async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await UserData.findById(userId);
    if (user) {
      res.status(200).json({ deletedTodos: user.todosHistory });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching deleted todos" });
  }
});



app.post('/deleteTodoInHistory', async (req, res) => {

    try{
      const {userId, todoId} = req.body;
  
      console.log("User ID: " + userId);
      console.log("Todo to delete: " + todoId);
  
      const user = await UserData.findOne({userId});
      if (!user) {
        console.log("User not found");
        return res.status(404).json({ error: "User not found" });
      }
  
  
      //grab the todo by id
      const todo = user.todosHistory.find((todo) => todo.id === todoId);
      if (!todo) {
        console.log("Todo not found");
        return res.status(404).json({ error: "Todo not found" });
      }
  
      //add the todo to the user history table
      user.todosHistory = user.todosHistory.filter((todo) => todo.id !== todoId)
  
      // Delete task
      //user.todos.pull(todoId);
      await user.save();      
  
      //save the deleted task into the history table
      console.log("History updated!");
  
    //console log the updated array size
    /* fill this in */
  
    // Return the updated todos list
    res.status(200).json({ history: user.todosHistory });
    } catch (error) {
      console.error("Error deleting todo:", error);
      res.status(500).json({ error: "An error occurred while deleting the todo" });
    }
    });


  app.post('/restoreTodo', async (req, res) => {

    try {
      const { userId, todoId } = req.body;
      /* switch the todo from todosHistory to todos*/
      const user = await UserData.findOne({userId});
      if (!user) {
        console.log("User not found");
        return res.status(404).json({ error: "User not found" });
      }

      const todo = user.todosHistory.find((todo) => todo.id === todoId);

      user.todos.push(todo);
      user.todosHistory = user.todosHistory.filter((todo) => todo.id !== todoId)
      await user.save();

      console.log("Todos and history updated!");
      res.status(200).json({ todos: user.todos, history: user.todosHistory });
    } catch (error) {

      console.log("error restoring a todo: ", error);
      res.status(500).json({ error: "An error occurred while restoring the todo" });

    }

  });



  app.post('/getWeather', async (req, res) => {

    const { userId } = req.body;




  });



  app.post('/storeTimeAndKibbles', async (req, res) => {
    try {
      const {userId, time, timezone} = req.body;
      const user = await UserData.findOne({userId});
      const currentDay = moment.tz(timezone).format('dddd').toLowerCase();


      if (!user) {
        console.log("User not found");
        return res.status(404).json({ error: "User not found" });
      }
  

      if (!user.weeklyTime) {
        user.weeklyTime = {
          sunday: 0,
          monday: 0,
          tuesday: 0,
          wednesday: 0,
          thursday: 0,
          friday: 0,
          saturday: 0,
        };
      }

      user.weeklyTime[currentDay] = (user.weeklyTime[currentDay] || 0) + time;


      // Update user data
      const updatedUser = await UserData.findByIdAndUpdate(
        userId,
        {
          $inc: { time: time, kibbles: time }, // Increment the time and kibbles fields
        },
        { new: true } // Return the updated document
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }      
      
      await user.save();

      //console.log("Time and Kibbles updated!");
      res.status(200).json();
    } catch (error) {
        //console.log("error updating time");
        res.status(500).json({ error: "An error occurred while storing the time spent studying" });
    }

  });

  
  app.post('/getTime', async (req, res) => {
    try {
    const {userId} = req.body;
    const user = await UserData.findOne({userId});

    const study_time = user.time;

    //console.log("Time updated!");
    res.status(200).json({time: study_time});
    } catch (error) {
      //console.log("error fetching time");
      res.status(500).json({ error: "An error occurred while fetching the time spent studying" });

    }

  });

  
  app.post('/getWeeklyTime', async (req, res) => {
    try {
    const {userId} = req.body;
    const user = await UserData.findOne({userId});

    if (!user) {
      res.status(404).json("user not found while getting time");
    }

    if (!user.weeklyTime) {
      user.weeklyTime = {
        sunday: 1,
        monday: 1,
        tuesday: 1,
        wednesday: 1,
        thursday: 1,
        friday: 1,
        saturday: 1
      };
    }

    //console.log(user.weeklyTime);

    res.status(200).json({weeklyTime: user.weeklyTime});

    } catch (error) {
      console.log("error fetching time");
      res.status(500).json({ error: "An error occurred while fetching the weekly time studying" });

    }

  });


  app.post('/getTimeAndKibbles', async (req, res) => {
      try {
        const {userId} = req.body;
        const user = await UserData.findOne({userId});

        console.log(userId);
        if (!user) {
          console.log("user not found")
          res.status(404).json({error: "user not found!"})
        } 



        res.status(200).json({hours: user.time, kibbles: user.kibbles})

      } catch (error) {
        console.log('failed to retrieve time and kibbles');
        res.status(500).json({error: "an error occured while fetching time and kibbles"})

      }



  });


  app.post('/getKibbles', async (req, res) => {
    try {
    const {userId} = req.body;
    const user = await UserData.findOne({userId});


    const kibbles = user.kibbles;

    console.log("kibbles updated!");
    res.status(200).json({kibbles: kibbles});
    } catch (error) {

      console.log("error fetching kibbles");
      res.status(500).json({ error: "An error occurred while fetching the kibbles" });

    }

  });


  app.post('/getBio', async (req, res) => {

    try {
      const {userId} = req.body;
      const user = await UserData.findOne({userId});

      if (!user) {
        res.status(404).json("user not founnd");
      }

      if (!user.bio) {
        await user.updateOne({bio: "I am a new miso user!"}, {new:  true});
        await user.save();
      }

      const bio = user.bio;
      res.status(200).json({bio: bio});
    } catch (error) {
      res.status(500).json("error retrieving bio");
    }
  });


  app.post('/editBio', async (req, res) => {
    try {
      const { userId, bio } = req.body;
      console.log(bio);
      const user = await UserData.findOne({ userId });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      // Update the bio field and save the user
      user.bio = bio;
      await user.save();
  
      console.log('Bio edited successfully!');
      res.status(200).json({ bio: bio });
    } catch (error) {
      console.error('Error editing bio:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post('/updateProfilePicture', async (req, res) => {
    // The image is expected to be a Base64 encoded string
  
    // Save the image to the database
    try {
      const { userId, image } = req.body;
      const user = await UserData.findOne({ userId });
      const result = await user.updateOne({image: image}, {new: true}); // Implement this function
      res.status(200).json("pfp changed!");
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, message: 'Failed to save image.' });
    }
  });

  app.post('/updateBackgroundImage', async (req, res) => {
    
    try {
      const {userId, image} = req.body;
      const user = await UserData.findOne({userId});
      await user.updateOne({wallpaper: image}, {new: true}); 
      res.status(200).json("wallpaper changed!");
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, message: 'Failed to save wallpaper.'});
    }
  });

  app.post('/getWallpaper', async (req, res) => {
  
    try {
      const {userId} = req.body;
      const user = await UserData.findOne({userId});

      if (!user) {
        res.status(404).json("user not found");
      }

      //console.log("picture from backend: " + user.image);

      //console.log('setting profile picture from backend!');
      res.status(200).json({wallpaper: user.wallpaper.toString()});
    } catch (error) {
      res.status(500).json("profile picture failed");
    }


  });
  
  app.post('/getProfilePicture', async (req, res) => {
  
    try {
      const {userId} = req.body;
      const user = await UserData.findOne({userId});

      if (!user) {
        res.status(404).json("user not found");
      }

      //console.log("picture from backend: " + user.image);

      //console.log('setting profile picture from backend!');
      res.status(200).json({image: user.image.toString()});
    } catch (error) {
      res.status(500).json("profile picture failed");
    }


  });

  app.post('/changeTimezone', async (req, res) => {
    try {
      const {userId, timezone} = req.body;
      const user = await UserData.findByIdAndUpdate(userId, {timezone: timezone},  { new: true })

      if (!user) {
        //console.log("User not found");
        return res.status(404).json({ error: "User not found" });
      }

      user.save()
      //console.log('timezone changed in the db!')

      res.status(200).json()
    } catch (error) {
        //console.log("error changing timezone");
        res.status(500).json({ error: "An error occurred while changing the timezone" });
    }
  });

  app.post('/createNotebook', async (req, res) => {
    try {
      const {userId, notebook} = req.body;
      const user = await UserData.findOne({userId});

      if (!user) {
        //console.log("User not found");
        return res.status(404).json({ error: "User not found" });
      }

      if (!user.notebooks) {
        user.notebooks = [];
      }

      console.log('notebook being created:' + notebook)

      await user.notebooks.push(notebook);
      await user.save();
      console.log('notebook created in the db!')


    } catch (error) {
      console.log("error creating notebook");
      res.status(500).json({ error: "An error occurred while creating the notebook" });
    }
  });

  app.post('/getNotebooks', async (req, res) => {

    try {
      const {userId} = req.body;
      const user = await UserData.findOne({userId});

      if (!user) {
        console.log("User not found");
        return res.status(404).json({ error: "User not found" });
      }


      const notebooks = user.notebooks.map(notebook => ({
        notebookId: notebook.notebookId, // Convert _id to id
        title: notebook.title,
        text: notebook.text,
        // ... other fields ...
      }));
      
      console.log("notebooks" + JSON.stringify(notebooks));

      console.log('notebook retrieved from the db!')



      res.status(200).json({notebooks: notebooks});
    } catch (error) {
      console.log("error fetching notebook");
      res.status(500).json({ error: "An error occurred while fetching the notebook(s)" });
    }


  });

  app.post('/updateNotebook', async (req, res) => {

    try {
      const {userId, notebookId, content} = req.body;
      console.log(`UserID: ${userId}, NotebookID: ${notebookId}, Content: ${content}`);

      const user = await UserData.findOne({userId});

      if (!user) {
        console.log("User not found");
        return res.status(404).json({ error: "User not found" });
      }

      const notebook = await user.notebooks.find((notebook) => notebook.notebookId === notebookId); 



      console.log(notebook);
      
      if (!notebook) {
        console.log("Notebook not found");
        return res.status(404).json({ error: "Notebook not found" });
      }

      console.log("from the backend: " + content);

      notebook.text = content;
      user.markModified('notebooks');
      await user.save();
      console.log('notebook updated in the db!')
      res.status(200).json({notebooks: user.notebooks});


    } catch (error) {
      console.log("error updating notebook: " + error);
      res.status(500).json({ error: "An error occurred while updating the notebook" });

    }

  });


  app.post('/fetchNotebook', async (req, res) => {

    try {
      const {userId, notebookId} = req.body;
      const user = await UserData.findOne({userId});

      if (!user) {
        console.log("User not found");
        return res.status(404).json({ error: "User not found" });
      }

      //find the notebook that matches the id
      const notebook = await user.notebooks.find((notebook) => notebook.notebookId === notebookId); 
      
      console.log("notebooks" + JSON.stringify(notebook));


      console.log('notebook retrieved from the db!')



      res.status(200).json({notebook: notebook});
    } catch (error) {
      console.log("error fetching notebook");
      res.status(500).json({ error: "An error occurred while fetching the notebook(s)" });
    }


  });

  app.post('/deleteNotebook', async (req, res) => {
    
    try {
      const {userId, notebookId} = req.body;

      console.log("attempting to delete notebook: " + notebookId);

      const user = await UserData.findById(userId);

      if (!user) {
        console.log("user not found while deleting notebook");
        return res.status(404).json({ error: "User not found" });
      }

      const notebook = user.notebooks.find((notebook) => notebook.notebookId === notebookId);

      if (!notebook) {
        console.log("notebook not found while deleting");
        return res.status(404).json({ error: "Notebook not found" });
      }

      user.notebooks = user.notebooks.filter((notebook) => notebook.notebookId !== notebookId);

      await user.save();

      console.log("notebook deleted: " + notebookId);
      res.status(200).json({notebooks: user.notebooks});
    } catch (error) {
      console.error("Error deleting notebook:", error);
      res.status(500).json({ error: "An error occurred while deleting the notebook" });
    }
    
    
  });



  app.post('/updateNotebookTitle', async (req, res) => {
    try {
      const {userId, notebookId, title} = req.body;

      const user = await UserData.findById(userId);

      if (!user) {
        console.log("user not found while deleting notebook");
        return res.status(404).json({ error: "User not found" });
      }

      const notebook = user.notebooks.find((notebook) => notebook.notebookId === notebookId);

      if (!notebook) {
        console.log("notebook not found while deleting");
        return res.status(404).json({ error: "Notebook not found" });
      }

      notebook.title = title;
      user.markModified('notebooks');
      user.save();

      console.log("notebook " + notebookId + " updated with title: " + title);
      res.status(200).json({notebooks: user.notebooks});
    } catch (error) {
      console.error("Error editing notebook title:", error);
      res.status(500).json({ error: "An error occurred while editing the notebook title" });
    }



  });


  /*** SPOTIFY BACKEND *****/
  app.get('/auth/login', (req, res) => {

    var scope = 'user-read-private user-read-email playlist-read-private user-modify-playback-state user-library-read app-remote-control streaming user-read-playback-position';  // Add other necessary scopes
    var state = randomString(16);
  
    var auth_query_parameters = new URLSearchParams({
      response_type: "code",
      client_id: spotify_client_id || '',
      scope: scope,
      redirect_uri: spotify_redirect_uri || '',
      state: state
    })
  
    res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
  })
  
  app.get('/auth/callback', (req, res) => {
  
    var code = req.query.code;
  
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: spotify_redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
        'Content-Type' : 'application/x-www-form-urlencoded'
      },
      json: true
    };
  
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        global.access_token = body.access_token;
        global.refreshToken = body.refresh_token; // Store refresh token

        console.log(global.access_token)
        res.redirect('http://localhost:5173')
      }
    });
  })
  
  app.get('/auth/token', (req, res) => {
    res.json(
      { access_token: global.access_token
      })
  })
  
  app.post('/getToken', cors(corsOptions),(req, res) => {
  
    try {
      console.log("getting token: " + global.access_token);
      
      res.status(200).json({ access_token: global.access_token})
    } catch (error) {
      res.status(500).json("cannot be retrieved");
    }
  
  });
  
  
  
  app.get('/auth/token', (req, res) => {
    res.json({ access_token: global.access_token})
  })  

  app.post('/refreshToken', (req, res) => {
    var refreshOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        refresh_token: global.refreshToken,
        grant_type: 'refresh_token'
      },
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
        'Content-Type' : 'application/x-www-form-urlencoded'
      },
      json: true
    };
  
    request.post(refreshOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        global.accessToken = body.access_token; // Update access token
        res.json({ access_token: global.accessToken });
      } else {
        // Error handling
        res.status(response.statusCode).json({ error: "Failed to refresh token", details: body });
      }
    });
  });