import express from 'express';
import morgan from 'morgan';
import healthRouter from './routes/health.js';
import subscriptionRouter from './routes/subscription.js';

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/v1/healthchecker/', healthRouter);
app.use('/api/subscriptions/', subscriptionRouter);


app.get('/greet', (req, res) => {
  res.send('Hello, World!');
});

app.all('/{*splat}', (req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
