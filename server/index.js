import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

app.use(express.static("public"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// localhost:5000/posts
app.use('/posts', postRoutes);
// localhost:5000/user
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send('APP IS RUNNING.');
});


const PORT = process.env.PORT || 5000;

// To suppress the warning
// DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7
mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`));





// https://www.mongodb.com/cloud/atlas