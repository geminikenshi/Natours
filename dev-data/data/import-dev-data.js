import 'dotenv/config.js';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import Tour from '../../models/tourModel.js';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

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

// READ JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname.slice(1)}/tours-simple.json`),
);

// IMPORT DATA INTO DB
const importDATA = async () => {
  try {
    await Tour.create(tours);
    console.log('Data import successfully');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data delete successfully');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// console.log(process.argv);

if (process.argv[2] === '--import') {
  importDATA();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
