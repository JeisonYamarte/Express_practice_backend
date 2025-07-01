const bcrypt = require('bcrypt')

const password = 'J27420459'

const response = bcrypt.hashSync(password, 10);

console.log(response);
