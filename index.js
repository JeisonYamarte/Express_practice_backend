const express = require('express');
const routerApi = require('./routes/indexRouter');
const cors = require('cors');



const {logErrors, clientErrorHandler, boomErrorHandler, sequelizeErrorHandler} = require('./middlewares/errorHandle');
const sequelize = require('./libs/sequelize');

const app = express();
const PORT = 3000;


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
app.use(sequelizeErrorHandler);
app.use(boomErrorHandler);
app.use(clientErrorHandler);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

