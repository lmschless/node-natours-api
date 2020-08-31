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

// Create route for specific tour id
// :id creates a param that can be used as a variable.
// :id? would create an optional param
app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1; // convert string to num
  const tour = tours.find((tour) => tour.id === id);

  // add check to throw error if id is > length of array or if  the find method cannot find the id.
  // if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

// create post request so user can add a new tour
app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      }); // created
    }
  );
});

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
