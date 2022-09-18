import express, { json } from 'express';
import signInRouter from './routes/users.js';

const port = 3000 || process.env.PORT;

const app = express();
app.use(json());

app.get('/', (req, res) => {
  res.json({ message: 'alive' });
});

app.use('/sign-in', signInRouter);

app.listen(port, () => {
  console.log(`Api app listening on port ${port}`);
});
