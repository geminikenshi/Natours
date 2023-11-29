import Tour from '../models/tourModel.js';

// const __filename = new URL(import.meta.url).pathname;
// const __dirname = path.dirname(__filename);
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname.slice(1)}/../dev-data/data/tours-simple.json`),
// );

const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res
      .status(400)
      .json({ status: 'fail', message: 'Request missing required field' });
  }
  next();
};

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // result: tours.length,
    // data: { tours },
  });
};
const getTour = (req, res) => {
  //   console.log(req.params);
  // const id = parseInt(req.params.id);
  // const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      //tour
    },
  });
};
const createTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    data: {
      // tour: newTour,
    },
  });
};
const updateTour = (req, res) => {
  // const id = parseInt(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour>',
    },
  });
};
const deleteTour = (req, res) => {
  // const id = parseInt(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

export { getAllTours, getTour, createTour, updateTour, deleteTour, checkBody };
