const express = require('express');
const {faker} = require('@faker-js/faker');
const routerApi = require('./routes/indexRouter');

const {logErrors, clientErrorHandler, boomErrorHandler} = require('./middlewares/errorHandle')

const app = express();
const PORT = 3000;

app.use(express.json());

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

