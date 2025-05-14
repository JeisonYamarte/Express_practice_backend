const express = require('express');
const routerApi = require('./routes/indexRouter');
const cors = require('cors');



const {logErrors, clientErrorHandler, boomErrorHandler} = require('./middlewares/errorHandle')

const app = express();
const PORT = 3000;


app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.com'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  },
};
app.use(cors());

app.get('/api/test', (req, res) => {
  res.json({ message: 'CORS funciona correctamente 🎉' });
});

app.get('/', (req, res)=>{
  res.send('MY FIRST EXPRESS APP');
});

app.get('/new_ruta', (req, res)=>{
  res.send('Ruta Page');
}
);

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(clientErrorHandler);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

