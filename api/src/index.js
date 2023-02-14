import express from 'express';
import { router } from './routes.js';

const app = express();
app.use(express.json());

app.use((req, _res, next) => {
  console.log(`New request: ${req.method} ${req.url}`);
  next();
});

app.use('/', router);

const port = process.env.PORT ?? 5050;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
