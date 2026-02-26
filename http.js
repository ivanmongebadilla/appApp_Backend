
import express, {json} from 'express';
import { userRouter } from './routes/user.js';
import { applicationRouter } from './routes/applications.js';
import morgan from 'morgan';
import { AppError } from './utils/apperror.js';
import { errorHandler } from './controllers/errorcontrollers.js';

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

app.use((req, res, next) => { //This run for all the methods will get there if does not reach any of the other endpoints
  next(new AppError(`Can't find ${req.originalUrl}`, 404)); //When sending props into next function Express know it's an error so it will call the Express Error Handeling middleware
})

//Express Error Handeling middleware
app.use(errorHandler)

// ***** LISTEN ***** /
app.listen(port, () => {
  console.log(`Server listening at http://${hostname}:${port}/`)
});