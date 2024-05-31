const express = require('express');
const cors = require('cors')
require('dotenv').config()
const  connectDB =  require('./config/db.config')
const app = express();

app.use(express.json())
app.use(cors())



app.get('/', (_, res) => {
    res.send(`Hello World!`);
});


const PORT = process.env.PORT || 1000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB()
});