const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res)=>{
  res.send('MY FIRST EXPRESS APP');
});

app.get('/new_ruta', (req, res)=>{
  res.send('Ruta Page');
}
);

app.get('/products', (req, res)=>{
  res.json({
    name: 'Product 1',
    price: 100,
    description: 'This is a product'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

