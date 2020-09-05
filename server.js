import dotenv from 'dotenv';
// eslint-disable-next-line import/extensions
import app from './app.js';

dotenv.config({ path: './config.env' }); // have to import dotenv before app

//// START SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
