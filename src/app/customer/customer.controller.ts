import Counter from "../common/counter.model"; // counter model for unique id's for customers and products
import {Cart} from "./../cart/cart.model";
import {Customer} from "./customer.model";  // model

class CustomerController {

    public  addCustomer = async (req: any, res: any) => {
        const counter = await Counter.findOne({_id: "customers"});  // check counter for generating cutomerID
        // create new document of product
        const customer = new Customer({
            id: counter ? (counter.toObject().seq) + 1 : 1,
            name: req.body.name,
            email:  req.body.email,
            mobile: req.body.mobile,
            address: req.body.address,
            pincode: req.body.pincode,
        });
        try {
           const response = await customer.save();  // save customer
           if (counter) {
            await  Counter.updateOne({_id: "customers"}, {seq : response.id});  // update counter
           } else {
              await new Counter({_id: "customers", seq: 1 }).save(); // initialize the counter
           }
           res.status(200).json({result: "Success", response});
        } catch (error) {
            // catch for any error occurs in try block while saving saving to db
            console.error(error);
            res.status(400).json({result: "Error", error});
        }

    }
    public  updateCustomer = async (req: any, res: any) => {
        const id = Number(req.params.id);
        try {
           const response = await Customer.updateOne({id}, req.body);
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
           if (response) {
            await Cart.findOneAndRemove({customerId: id});
            res.status(200).json({result: "Success", response});
             } else {
               // no response, send status not modified, customer not deleted
               res.sendStatus(304);
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
           if (response.length) {res.status(200).json({result: "Success", response}); } else {
               // check response array length, send status not found, customer not found
               res.status(404).json({result: "Fail", response: "No customer found"}); }
        } catch (error) {
            console.error(error);
            res.status(400).json({result: "Error", error});
        }
    }
}
export default new CustomerController();
