import express from 'express';
import customerRouter from './src/routes/customer.route.js';
import { connectDB } from './connectDB.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get('/', (req, res) => {
    res.send(
        { message: 'Hello World!' }
    );
});

app.use('/customers', customerRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

