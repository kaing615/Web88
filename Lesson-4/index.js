import express from 'express';
import { connectDB } from './src/connectDB.js';
import { Customer, Order, Product } from './Model/index.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

//add new Customer
app.post('/customers', async (req, res) => {
    try {
        const { name, email, age } = req.body;

        if (!name || !email || !age) {
            return res.status(400).json({ message: 'Name, email, and age are required' });
        }

        const newCustomerData = {
            name,
            email,
            age
        };

        const newCustomer = await Customer.create(newCustomerData); 
        res.status(201).json(newCustomer);    
    } catch (error) {
        res.status(500).json({ message: 'Error creating customer', error });
    }
})

//add new Order
app.post('/orders', async (req, res) => {
    try {
        const {customerId, productId, quantity} = req.body;
        if (!customerId || !productId || !quantity) {
            return res.status(400).json({ message: 'Customer ID, Product ID, and quantity are required' });
        }
        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (product.quantity < quantity) {
            return res.status(400).json({ message: 'Insufficient product quantity' });
        }
        const totalPrice = product.price * quantity;

        const newOrderData = {
            customerId,
            productId,
            quantity,
            totalPrice
        };

        const newOrder = await Order.create(newOrderData);
        product.quantity -= quantity;
        await product.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
});

 app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

