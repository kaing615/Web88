import express from 'express';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// POST Create a new customer
app.post('/customers', async (req, res) => {
    console.log("POST /customers chạy");
    const { name, email, age } = req.body;

    if (!name || !email || !age) {
        return res.status(400).json({ message: 'Name, email, and age are required' });
    }

    const customerList = await axios.get('http://localhost:3000/customers');
    const existingCustomerEmail = customerList.data.find(customer => customer.email == email);

    if (existingCustomerEmail) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    const newCustomer = {
        id: uuid(), 
        name,
        email,
        age
    };

    const {data} = await axios.post('http://localhost:3000/customers', newCustomer);

    res.json({
        message: 'Customer created successfully',
        data: data
    })
}); 

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});