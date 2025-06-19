const express = require('express');
const routerApi = require('./routes/indexRouter');
const cors = require('cors');
const {config} = require('./config/config');



const {logErrors, clientErrorHandler, boomErrorHandler, sequelizeErrorHandler} = require('./middlewares/errorHandle');


const app = express();
const port = process.env.PORT;



app.use(express.json());


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
app.use(sequelizeErrorHandler);

console.log(`Environment: ${config.env}`);
console.log(`Port: ${config.port}`);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});

