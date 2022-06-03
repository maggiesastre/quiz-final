const cors = require('cors');
const express = require('express');
const { validateUser } = require('./auth/login');


const portAuth=3000;

const app = express();
app.use(cors());

app.listen(portAuth, () => console.log('server running'));

    
app.get('/login', (validateUser));


