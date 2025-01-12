const express = require('express');

const PORT = 8005;

const app = express();

const {mongoDbConnection} = require('./db');

const taskRouter = require('./routes/task');

const userRouter = require('./routes/user');

const cors = require('cors');


const {restrictToLoggedIn} = require('./middleware/auth');

//Connection with MongoDb -->
const url = 'mongodb://127.0.0.1:27017/toDoUsers';

mongoDbConnection(url);

app.use(cors());

app.use(express.json());
//routes -->

app.use('/tasks',restrictToLoggedIn,taskRouter);

app.use('/auth',userRouter);

//Server Started successfully? -->

app.listen(PORT,()=>{
    console.log(`Server started successfully!! at Port: ${PORT}`);
});