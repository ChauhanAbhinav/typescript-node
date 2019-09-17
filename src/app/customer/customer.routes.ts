import { Router } from "express";
import CustomerController from "./customer.controller"; // controller
import CustomerValidator from "./customer.validators";

const router = Router();
router.get("/all",  CustomerController.getAllCustomers);
router.get("/:id",  CustomerController.getCustomer);
router.post("/add",  CustomerController.addCustomer);
router.put("/update/:id", CustomerValidator.rules(), CustomerValidator.validate, CustomerController.updateCustomer);
router.delete("/delete/:id",  CustomerController.deleteCustomer);

export default router;
