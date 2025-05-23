 import { Router } from "express";
 import { customerRegister, getAllCustomers, updateCustomerById } from "../controllers/customer.controller.js";

 const customerRouter = Router();
 customerRouter.get('/', getAllCustomers);
 customerRouter.post('/register', customerRegister);
 customerRouter.put('/:id', updateCustomerById);

 export default customerRouter; 