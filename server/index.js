const express = require("express")
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors')
const bodyParser = require('body-parser')
const adminRouter = require('./routes/adminRoute');
const insightRoutes = require('./routes/insightRoute');


app.use(cors())

dotenv.config();


app.use(bodyParser.json());


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB CONNECTED");
}).catch((err) => {
    console.log(err);
});

app.use('/api/admin', adminRouter);
app.use('/api/insights', insightRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
