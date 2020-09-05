import express from 'express';
import morgan from 'morgan';
import tourRouter from './routes/tourRoutes.js';
import userRouter from './routes/userRoutes.js';
import path from 'path';

const __dirname = path.resolve();
// App entry point file handles database config, server variables, etc.

const app = express();

//// 1) MIDDLEWARE
// removes console logger if in prod
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
// express middleware which sets the public folder as root and serves up html based on the path. /overview
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware!');
  next(); // need to call next every time.
});

// middleware that adds the request time
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
///////////////////////////
///////////////////////////

// MOUNT ROUTERS (from imported files)

// apply the users middleware and use the imported users file
app.use('/api/v1/users', userRouter);
// apply the tours middleware and use the imported tours file
app.use('/api/v1/tours', tourRouter);

export default app;

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
