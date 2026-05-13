const express = require('express');
const app = express();

require('dotenv').config();

const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const auth = require('./route/auth');
const userRouter = require('./route/user');
const jobdataRouter = require('./route/jobdata');

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'https://trackly-alpha-silk.vercel.app',
    credentials: true
}));

app.use("/", userRouter);
app.use("/auth", auth);
app.use("/job", jobdataRouter);

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send("Something went wrong");
});

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB connected");

    app.listen(8000, () => {
        console.log("Server started");
    });
})
.catch(err => console.log(err));