const express = require("express");
const cors = require("cors");
const userRoute = require('./routes/UserRoutes');
// router pages

const app = express();


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

// routes
app.use('/api/v1/users',userRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`));
