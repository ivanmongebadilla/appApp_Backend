
import express, {json} from 'express';
import { userRouter } from './routes/user.js';
import { applicationRouter } from './routes/applications.js';

const app = express();
const hostname = 'localhost';
const port = 3000;

app.use(express.json()); //Middleware to parse JSON bodies comming from request

app.use('/user', userRouter);
app.use('/application', applicationRouter);

app.listen(port, () => {
  console.log(`Server listening at http://${hostname}:${port}/`)
});