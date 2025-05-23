import express from 'express';
import { connectDB } from './connectDB.js';
import { Customer, Order, Product } from './src/models/index.js';
import { authorization } from './src/middlewares/authorization.js';

const app = express();
const PORT = 3000;
const randomString = Math.random().toString(36).substring(2, 15);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get('/', (req, res) => {
    res.send(
        { message: 'Hello World!' }
    );
});

//create a token
app.get('/customers/getApiKey/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await Customer.findById(id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        console.log("🚀 ~ app.get ~ customer:", customer);
        const email = customer.email;
        
        const token = `web-${id}-${email}-${randomString}`;
        console.log("🚀 ~ app.get ~ token:", token);

        res.status(200).json({
            message: 'Token created successfully',
            token: token
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating token', error });
    }
});

//get all customers
app.get('/customers', authorization , async (req, res) => {
    try {
        console.log("🚀 ~ app.get ~ req.userInfo:", req.userInfo);
        const customers = await Customer.find();
        res.status(200).json(
            {
                message: 'Customers fetched successfully',
                customerList: customers
            }
        );
    } catch (error) {
        res.status(500).json({ message: 'Error fetching customers', error });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
