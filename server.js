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

const tourSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: Number,
  price: { type: Number, required: [true, 'A tour must have a name'] },
});

const Tour = mongoose.model('Tour', tourSchema, 'tours');

const testTour = new Tour({
  name: 'The Park camper',
  rating: 4.1,
  price: 269,
});

testTour
  .save()
  .then((doc) => console.log(doc))
  .catch((err) => console.log('Error: ', err));

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
