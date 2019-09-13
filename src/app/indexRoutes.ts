import {Router} from "express";
// import all routes
import cartRoutes from "./cart/cart.routes";
import customerRoutes from "./customer/customer.routes";
import productRoutes from "./product/product.routes";

const router = Router();

router.use("/customer", customerRoutes );
router.use("/product", productRoutes );
router.use("/cart", cartRoutes );

export default router;

// const Routes: Router[] = [];
// Routes.push(customerRoutes);
// Routes.push(ProductRoutes);
// export default Routes;
