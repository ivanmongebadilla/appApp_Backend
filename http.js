
import express, {json} from 'express';
import { userRouter } from './routes/user.js';
import { userSchema } from './models/userModel.js';

const app = express();
const hostname = 'localhost';
const port = 3000;

app.use(express.json()); //Middleware to parse JSON bodies comming from request

app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`Server listening at http://${hostname}:${port}/`)
});