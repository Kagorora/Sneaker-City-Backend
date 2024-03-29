import 'regenerator-runtime';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Sneaker City app backend!');
});

app.listen(PORT, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${PORT}`);
});

export default app;
