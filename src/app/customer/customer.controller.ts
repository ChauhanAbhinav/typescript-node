import Counter from "../common/counter.model"; // counter model for unique id's for customers and products
import {Customer} from "./customer.model";  // model

class CustomerController {

    public  addCustomer = async (req: any, res: any) => {
        const cust = req.body;
        const doc = await Counter.findOne({});  // check sequence in counter for generating cutomerID
        let seq;
        if (doc) {
           seq = doc.toObject().customerId;
           seq = seq + 1;
       }
        // create new customer document
        const customer = new Customer({
            id: seq,
            name: cust.name,
            email:  cust.email,
            mobile: cust.mobile,
            address: cust.address,
            pincode: cust.pincode,
        });
        try {
           const response = await customer.save();  // save customer
           await  Counter.updateOne({}, {customerId: seq});  // update counter
           res.status(200).json({result: "Success", response});
        } catch (error) {
            // catch for any error occurs in try block while saving saving to db
            console.error(error);
            res.status(400).json({result: "Error", error});
        }
    }
    public  updateCustomer = async (req: any, res: any) => {
        const cust = req.body;
        const id = Number(req.params.id);
        if (cust.id) {delete cust.id; } // delete id if present in payload, otherwise it will update too
        try {
           const response = await Customer.updateOne({id}, cust);
           if (response.nModified) { res.status(200).json({result: "Success", response}); } else {
                res.sendStatus(304);  // send status not modified, customer not updated
            }
        } catch (error) {
            console.error(error);
            res.status(400).json({result: "Error", error});
        }
    }
    public  deleteCustomer = async (req: any, res: any) => {
        const id: number = Number(req.params.id);
        try {
           const response = await Customer.findOneAndRemove({id});
           if (response) {res.status(200).json({result: "Success", response}); } else {
               // no response, send status not modified, customer not deleted
            res.status(304).json({result: "Fail", response: "Customer not deleted"});
           }
        } catch (error) {
            console.error(error);
            res.status(400).json({result: "Error", error});
        }
    }
    public  getCustomer = async (req: any, res: any) => {
        const id: number = Number(req.params.id);
        try {
           const response = await Customer.findOne({id});
           if (response) {res.status(200).json({result: "Success", response}); } else {
                 // no response, send status not found, customer not found
            res.status(404).json({result: "Fail", response: "Customer not found"}); }
        } catch (error) {
            console.error(error);
            res.status(400).json({result: "Error", error});
        }
    }
    public  getAllCustomers = async (req: any, res: any) => {
        try {
           const response = await Customer.find({});
           if (response.length !== 0) {res.status(200).json({result: "Success", response}); } else {
               // check response array length, send status not found, customer not found
               res.status(404).json({result: "Fail", response: "No customer found"}); }
        } catch (error) {
            console.error(error);
            res.status(400).json({result: "Error", error});
        }
    }
}

export default new CustomerController();
