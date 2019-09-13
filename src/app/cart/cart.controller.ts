import { Cart } from "./cart.model"; // model

class CartController {
// add item to cart
    public  addItem = async (req: any, res: any) => {
        const data = req.body;
        const customerId = Number(req.body.customerId);
        const productId = Number(data.items[0].id);
        let doc: any;
        try {
         doc = await Cart.findOne({customerId}); // check if cutomer exist in cart collecton
        } catch (error) {
            console.error(error);
            res.status(400).json({result: "Error", error});
        }

        if (doc) {
            // if customer exist then update the items array
            const items = doc.toObject().items;
            const index = items.findIndex((x: any ) => x.id === productId);

            if (index === -1) {
                // if item not exist in cart already
                items.push({id: productId, name: data.items[0].name, price: data.items[0].price});
                try {
                    const response = await Cart.updateOne({customerId: data.customerId}, {items}); // update to cart
                    res.status(200).json({result: "Success", response});
                 } catch (error) {
                     console.error(error);
                     res.status(400).json({result: "Error", error});
                 }
            } else {
                res.sendStatus(304); // item already exist
            }
        } else {
            // customer'not exist in cart then create customer's cart document
            const cart = new Cart({
                customerName: data.customerName,
                customerId:  data.customerId,
                items: [{
                    id: productId,
                    name: data.items[0].name,
                    price: data.items[0].price,
                }],
            });
            try {
               const response = await cart.save();  // save to cart
               res.status(200).json({result: "Success", response});
            } catch (error) {
                console.error(error);
                res.status(400).json({result: "Error", error});
            }
        }

    }
// delete item from cart
    public  deleteItem = async (req: any, res: any) => {
        const customerId: number = Number(req.params.customerId);
        const productId: number = Number(req.params.productId);
        let doc: any;
        try {
         doc = await Cart.findOne({customerId});  // check for customer in cart
        } catch (error) {
            console.error(error);
            res.status(400).json({result: "Error", error});
        }

        if (doc) {
            // customer found, delete item from items array and update item in db
            let items = doc.toObject().items;
            const index = items.findIndex((x: any ) => x.id === productId);
            if (index > -1) {
                // check if item is exist or not, if exist then delete it
               delete items[index];
               const filtered = items.filter( (el: any) => {
                return el != null;
              });
               items = filtered;
               try {
                    const response = await Cart.updateOne({customerId}, {items});
                    res.status(200).json({result: "Success", response});
                 } catch (error) {
                     console.error(error);
                     res.status(400).json({result: "Error", error});
                    }
                } else {
                    // item not exist
                    res.sendStatus(304);
                }
        } else {
            // customer not exist in cart
            res.sendStatus(304);
        }
    }
// delete all items
    public  deleteAllItems = async (req: any, res: any) => {
        const customerId: number = Number(req.params.customerId);
        let doc: any;
        try {
         doc = await Cart.findOne({customerId});  // check for customer in cart
        } catch (error) {
            console.error(error);
            res.status(400).json({result: "Error", error});
        }
        if (doc) {
            // customer found, empty the items array
            try {
                const response = await Cart.updateOne({customerId}, {items: []});
                res.status(200).json({result: "Success", response});
             } catch (error) {
                 console.error(error);
                 res.status(400).json({result: "Error", error});
             }
        } else {
            res.sendStatus(304);  // customer not exist
        }

    }
// get all items
    public  getAllItems = async (req: any, res: any) => {
        const customerId: number = Number(req.params.customerId);
        let doc: any;
        try {
         doc = await Cart.findOne({customerId}); // check for customer in cart
        } catch (error) {
            console.error(error);
            res.status(400).json({result: "Error", error});
        }

        if (doc) {
            try {
                // send items array in response
               res.status(200).json({result: "Success", response: doc.toObject().items});
             } catch (error) {
                 console.error(error);
                 res.status(400).json({result: "Error", error});
             }
        } else {
            res.sendStatus(404); // customer not exist
        }
}
}
export default new CartController();
