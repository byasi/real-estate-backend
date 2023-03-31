const express = require('express');
const cors = require('cors');

// router pages

const app = express();


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

// routes


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`));
