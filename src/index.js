const express = require("express");
const cors = require("cors");
const userRoute = require('./routes/UserRoutes');
const customerRoutes = require('./routes/CustomerRoutes');
// router pages

const app = express();


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

// routes
app.use('/api/v1/users',userRoute);
app.use('/api/v1/customers',customerRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`));
