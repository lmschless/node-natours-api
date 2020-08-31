import fs from 'fs';
import path from 'path';
import express from 'express';

const __dirname = path.resolve();
const app = express();

app.use(express.json());

// add first route and response
// app.get('/', (req, res) => {
//   // res.status(200).send('Hello from the server side!');
//   // automatically sets the content-type to json
//   res.status(200).json({ message: 'Hello from the server side!', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint...');
// });

// Read data at top level so it only gets executed once
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Express: Route Handler
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

// create post request so user can add a new tour
app.post('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
