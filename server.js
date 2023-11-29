import 'dotenv/config.js';
import mongoose from 'mongoose';
import app from './app.js';

const DB = process.env.MONGO_CLUSTER.replace(
  '<password>',
  process.env.MONGO_PASSWORD,
).replace('<database>', process.env.MONGO_DATABASE);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful');
  });

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
