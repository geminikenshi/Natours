import fs from 'fs';
import path from 'path';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const tours = JSON.parse(
  fs.readFileSync(`${__dirname.slice(1)}/../dev-data/data/tours-simple.json`)
);

const checkID = (req, res, next, val) => {
  console.log(`Tour id is ${val}`);
  if (val >= tours.length) {
    res.status(404).json({ status: 'fail', message: 'Invalid ID' });
    return;
  }
  next();
};

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    result: tours.length,
    data: { tours },
  });
};
const getTour = (req, res) => {
  //   console.log(req.params);
  const id = parseInt(req.params.id);
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({ status: 'success', data: { tour } });
};
const createTour = (req, res) => {
  //   console.log(req.body);
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname.slice(1)}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};
const updateTour = (req, res) => {
  const id = parseInt(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour>',
    },
  });
};
const deleteTour = (req, res) => {
  const id = parseInt(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

export { getAllTours, getTour, createTour, updateTour, deleteTour, checkID };
