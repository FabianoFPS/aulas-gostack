import express, { request } from 'express';
import { helloWord } from './routes'

const app = express();
app.get('/', helloWord);
app.listen(3333);
