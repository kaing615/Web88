import Customer from '../models/customer.model.js';

export const customerRegister = async (req, res) => {
    try {
        const { name, email, age = 1 } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: 'Name and  email are required' });
        }

        const newCustomerData = {
            name,
            email,
            age
        };

        const newCustomer = await Customer.create(newCustomerData); 
        res.status(201).json(
            {
                message: 'Customer created successfully',
                customer: newCustomer
            }
        );    
    } catch (error) {
        res.status(500).json({ message: 'Error creating customer', error });
    }
} 

export const getAllCustomers = async (req, res) => {
    try {
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
}

export const updateCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        const dataUpdate = req.body;
        if (!dataUpdate.name && !dataUpdate.email && !dataUpdate.age) {
            return res.status(400).json({ message: 'At least one field (name, email, age) is required for update' });
        }
        const currentCustomer = await Customer.findByIdAndUpdate(id, dataUpdate, { new: true });
        if (!currentCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json({
            message: 'Customer updated successfully',
            data: currentCustomer
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating customer', error });
    }
}