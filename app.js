import fs from 'fs';
import path from 'path';
import express from 'express';
import morgan from 'morgan';

const __dirname = path.resolve();
const app = express();

app.use(express.json());

//// 1) MIDDLEWARES

//
app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log('Hello from the middleware!');
  next(); // need to call next every time.
});

// middleware that handles adding the request time
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Read data at top level so it only gets executed once
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

//// 2) ROUTE HANDLERS
// refactored way of writing routes and responses

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};
const getTour = (req, res) => {
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
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        // created
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours/', createTour);
// app.patch('/api/v1/tours:id/', updateTour);
// app.delete('/api/v1/tours:id/', deleteTour);

// chain calls on the same route, functions the same as the code above.

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app.route('/api/v1/tours/:id').get(getTour).delete(deleteTour).patch(updateTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);

app.route('/api/v1/users/:id').get(getUser).patch(updateUser).delete(deleteUser);

//// 4) START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

// add first route and response
// app.get('/', (req, res) => {
//   // res.status(200).send('Hello from the server side!');
//   // automatically sets the content-type to json
//   res.status(200).json({ message: 'Hello from the server side!', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint...');
// });

// Express: Route Handler
// app.get('/api/v1/tours', (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     results: tours.length,
//     data: {
//       tours,
//     },
//   });
// });

// // Create route for specific tour id
// // :id creates a param that can be used as a variable.
// // :id? would create an optional param
// app.get('/api/v1/tours/:id', (req, res) => {
//   console.log(req.params);

//   const id = req.params.id * 1; // convert string to num
//   const tour = tours.find((tour) => tour.id === id);

//   // add check to throw error if id is > length of array or if  the find method cannot find the id.
//   // if (id > tours.length) {
//   if (!tour) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'invalid id',
//     });
//   }
//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour,
//     },
//   });
// });

// // create post request so user can add a new tour
// app.post('/api/v1/tours', (req, res) => {
//   // console.log(req.body);
//   const newId = tours[tours.length - 1].id + 1;
//   const newTour = Object.assign({ id: newId }, req.body);

//   tours.push(newTour);

//   fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     (err) => {
//       res.status(201).json({
//         status: 'success',
//         data: {
//           tour: newTour,
//         },
//       }); // created
//     }
//   );
// });

// app.patch('/api/v1/tours/:id', (req, res) => {
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'invalid id',
//     });
//   }
//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour: '<Updated tour here...>',
//     },
//   });
// });

// app.delete('/api/v1/tours/:id', (req, res) => {
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'invalid id',
//     });
//   }
//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// });
