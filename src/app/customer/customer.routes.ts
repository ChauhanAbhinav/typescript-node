import { Router } from "express";
import CustomerController from "./customer.controller"; // controller

const router = Router();
router.get("/all",  CustomerController.getAllCustomers);
router.get("/:id",  CustomerController.getCustomer);
router.post("/add",  CustomerController.addCustomer);
router.put("/update/:id",  CustomerController.updateCustomer);
router.delete("/delete/:id",  CustomerController.deleteCustomer);

export default router;
