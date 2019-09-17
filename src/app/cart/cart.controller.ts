import { Cart } from "./cart.model"; // model

class CartController {
// add item to cart
    public  addItem = async (req: any, res: any) => {
        const customerId = Number(req.body.customerId);
        const productId = Number(req.body.item.id);
        try {
            // tslint:disable-next-line: max-line-length
            const response = await Cart.updateOne({customerId}, {$addToSet: {items: { id: productId, name: req.body.item.name, price: req.body.item.price}}});
            if (response.n) { // document matched, update the items array
                if (response.nModified) {
                    res.status(200).json({result: "Success", response});
                } else {
                    res.sendStatus(304); // item already exist
                }
            } else {
            // document not matched, then create customer's cart
            const cart = new Cart({
                customerName: req.body.customerName,
                customerId,
                items: [{
                    id: productId,
                    name: req.body.item.name,
                    price: req.body.item.price,
                }],
            });
            const result = await cart.save();  // save to cart
            res.status(200).json({result: "Success", response: result});
            }
        } catch (error) {
            console.error(error);
            res.status(400).json({result: "Error", error});
        }
    }
// delete item from cart
    public  deleteItem = async (req: any, res: any) => {
        const customerId: number = Number(req.params.customerId);
        const productId: number = Number(req.params.productId);

        try {
            const response = await Cart.updateOne({customerId}, {$pull: {items: {id: productId}}});
            if (response.nModified) {
            res.status(200).json({result: "Success", response});
            } else {
            res.sendStatus(304);
            }
            } catch (error) {
                     console.error(error);
                     res.status(400).json({result: "Error", error});
                    }
    }
// delete all items
    public  deleteAllItems = async (req: any, res: any) => {
        const customerId: number = Number(req.params.customerId);
        try {
            const response = await Cart.updateOne({customerId}, {items: []});

            if (response.nModified) {
                res.status(200).json({result: "Success", response});
                } else {
                res.sendStatus(304);
                }
            } catch (error) {
                    console.error(error);
                    res.status(400).json({result: "Error", error});
             }

    }
// get all items
    public  getAllItems = async (req: any, res: any) => {
        const customerId: number = Number(req.params.customerId);
        try {
         const doc = await Cart.findOne({customerId}, {_id: 0, customerId: 0}); // check for customer in cart
         if (doc && doc.toObject().items.length) {
                // send items array in response
               res.status(200).json({result: "Success", response: doc.toObject().items});
         } else {
            res.sendStatus(404); // customer not exist
        }
        } catch (error) {
            console.error(error);
            res.status(400).json({result: "Error", error});
        }

}
}
export default new CartController();
