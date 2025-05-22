import express from 'express';
import { customers, orders, products } from './data.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

//get all customers

app.get('/customers', (req, res) => {
   res.status(200).json(customers); 
});

// get customer by id

app.get('/customers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = customers.find(customer => customer.id === id);
    if (!data) {
        return res.status(404).json({ message: 'Customer not found' });
    }
    console.log(data);
    res.status(200).json(data)
});

// get order of a customer

app.get('/customers/:id/orders', (req, res) => {
    const id = parseInt(req.params.id);
    const data = orders.filter(order => order.customerId === id);
    if (data.length === 0) {
        return res.status(404).json({ message: 'No orders found for this customer' });
    }
    res.status(200).json(data);
});

//get high order of a customer
app.get('/orders/high', (req, res) => {
    const data = orders.filter(order => order.totalPrice > 500);
    if (data.length === 0) {
        return res.status(404).json({ message: 'No orders found with high total price' });
    }
    res.status(200).json(data);
});

//get filter products by price range

app.get('/products', (req, res) => {
    const { minPrice, maxPrice } = req.query;
    const data = products.filter(product => product.price >= minPrice && product.price <= maxPrice);
    if (data.length === 0) {
        return res.status(404).json({ message: 'No products found in this price range' });
    }
    res.status(200).json(data);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});