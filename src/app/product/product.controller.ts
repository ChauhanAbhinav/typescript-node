import Counter from "../common/counter.model"; // counter model for unique id's for customers and products
import {Product} from "./product.model"; // model

class ProductController {

    public addProduct = async (req: any, res: any) => {
        const counter = await Counter.findOne({_id: "products"}); // check sequence in counter for generating cutomerID
        // create new document of product
        const product = new Product({
            name: req.body.name,
            id:  counter ? (counter.toObject().seq) + 1 : 1,
            brand: req.body.brand,
            expiry: req.body.expiry,
            manufacture: req.body.manufacture,
            price:  req.body.price,
        });
        try {
            const response =  await product.save();
            if (counter) {
                await  Counter.updateOne({_id: "products"}, {seq : response.id});  // update counter
               } else {
                  await new Counter({_id: "products", seq: 1 }).save(); // initialize the counter
               }
            res.status(200).json({result: "Success", response});
        } catch (error) {
        // catch for any error occurs in try block while saving saving to db
            console.error(error);
            res.status(400).json({result: "Error", error});
         }
     }
     public  updateProduct = async (req: any, res: any) => {
         const id = Number(req.params.id);
         if (req.body.id) {delete req.body.id; } // delete id if present in payload, otherwise it will update too
         try {
            const response = await Product.updateOne({id}, req.body);
            if (response.nModified) { res.json({result: "Success", response}); } else {
                res.sendStatus(304); // send status not modified, product not updated
            }
        } catch (error) {
            console.error(error);
            res.status(400).json({result: "Error", error});
         }
     }
     public  deleteProduct = async (req: any, res: any) => {
         const id = Number(req.params.id);
         try {
            const response = await Product.findOneAndRemove({id});
            if (response) {res.status(200).json({result: "Success", response}); } else {
                 // no response, send status not found, product not deleted
                res.status(400).json({result: "Fail", response: "No product deleted"});
               }
        } catch (error) {
            console.error(error);
            res.status(400).json({result: "Error", error});
         }
     }
     public  getProduct = async (req: any, res: any) => {
         const id = Number(req.params.id);
         try {
            const response = await Product.findOne({id});
            if (response) {
                res.json({result: "Success", response});
            } else {
                 // no response, send status not found, product not found
                res.status(404).json({result: "Fail", response: "No product found"});
            }

        } catch (error) {
            console.error(error);
            res.json({result: "Error", error});
         }
     }
     public  getAllProducts = async (req: any, res: any) => {
         try {
            const response = await Product.find({});
            if (response.length) {res.status(200).json({result: "Success", response}); } else {
                   // check response array length, send status not found, product not found
                res.status(404).json({result: "Fail", response: "No product found"}); }
        } catch (error) {
            console.error(error);
            res.status(400).json({result: "Error", error});
     }
 }
}
export default new ProductController();
