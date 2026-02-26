
import express, {json} from 'express';
import { userRouter } from './routes/user.js';
import { applicationRouter } from './routes/applications.js';
import morgan from 'morgan';

const hostname = 'localhost';
const port = 3000;

const app = express();

// ***** MIDDLEWARES ***** /
app.use(morgan('dev')); //To see information about the requests
app.use(express.json()); //Middleware to parse JSON bodies comming from request
app.use(express.urlencoded({extended: true})); //Middleware to parse URL encoded bodies coming from request


// ***** ROUTES ***** /
app.use('/api/v1/user', userRouter);
app.use('/api/v1/application', applicationRouter);

app.use((req, res, next) => { //This run for all the methods
  // res.status(404).json({
  //   status: 'failed',
  //   message: `Can't find ${req.originalUrl}`
  // })
  const err = new Error(`Can't find ${req.originalUrl}`) // Built-in Error constructor
  err.status = 'fail'
  err.statusCode = 404
  next(err); //When sending props into next function Express know it's an error so it will call the Express Error Handeling middleware
})

//Express Error Handeling middleware
app.use((err, req, res, next) =>{
  err.statusCode = err.statusCode || 500; // If there is no statusCode then default will be 500
  err.status = err.status || 'error' // If there is no status then default will be error
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  })
})

// ***** LISTEN ***** /
app.listen(port, () => {
  console.log(`Server listening at http://${hostname}:${port}/`)
});