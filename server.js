import mongoose from 'mongoose';
import dotenv from 'dotenv';
// eslint-disable-next-line import/extensions
import app from './app.js';

dotenv.config({ path: './config.env' }); // have to import dotenv before app

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// pass connection string and object with options into Mongoose
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log(con.connections);
    console.log('DB Connection Successful!');
  })
  .catch((error) => console.log(error));

//// START SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
