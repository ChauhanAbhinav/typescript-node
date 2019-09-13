import Counter from "../common/counter.model"; // counter model for unique id's for customers and products
import {Product} from "./product.model"; // model

class ProductController {

    public addProduct = async (req: any, res: any) => {
        const prod = req.body;
        const doc = await Counter.findOne({}); // check sequence in counter for generating cutomerID
        let seq;
        if (doc) {
           seq = doc.toObject().productId;
           seq = seq + 1;
       }
        // create new document of product
        const product = new Product({
            name: prod.name,
            id:  seq,
            brand: prod.brand,
            expiry: prod.expiry,
            manufacture: prod.manufacture,
            price:  prod.price,
        });
        try {
            const response =  await product.save();
            await  Counter.updateOne({}, {productId: seq});
            res.status(200).json({result: "Success", response});
        } catch (error) {
        // catch for any error occurs in try block while saving saving to db

            console.error(error);
            res.status(400).json({result: "Error", error});
         }
     }
     public  updateProduct = async (req: any, res: any) => {
         const prod = req.body;
         const id = Number(req.params.id);
         if (prod.id) {delete prod.id; } // delete id if present in payload, otherwise it will update too
         try {
            const response = await Product.updateOne({id}, prod);
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
            if (response.length !== 0) {res.status(200).json({result: "Success", response}); } else {
                   // check response array length, send status not found, product not found
                res.status(404).json({result: "Fail", response: "No product found"}); }
        } catch (error) {
            console.error(error);
            res.status(400).json({result: "Error", error});
     }
 }
}
export default new ProductController();
