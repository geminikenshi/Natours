import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from the server!', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.status(202).send('You can post to this endpoint');
});

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const tours = JSON.parse(
  fs.readFileSync(`${__dirname.slice(1)}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', result: tours.length, data: { tours } });
};

const getTour = (req, res) => {
  //   console.log(req.params);
  const id = parseInt(req.params.id);
  const tour = tours.find((el) => el.id === id);

  //   if (id >= tours.length) {
  if (!tour) {
    res.status(404).json({ status: 'fail', message: 'Invalid ID' });
    return;
  }

  res.status(200).json({ status: 'success', data: { tour } });
};

const createTour = (req, res) => {
  //   console.log(req.body);
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname.slice(1)}/dev-data/data/tours-simple.json`,
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

  if (id >= tours.length) {
    res.status(404).json({ status: 'fail', message: 'Invalid ID' });
    return;
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour>',
    },
  });
};

const deleteTour = (req, res) => {
  const id = parseInt(req.params.id);

  if (id >= tours.length) {
    res.status(404).json({ status: 'fail', message: 'Invalid ID' });
    return;
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
