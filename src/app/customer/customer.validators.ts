import { body, validationResult } from "express-validator/check";

class CustomerValidator {
// custom validator
// public updateValidator = (req: any, res: any, next: any) => {
//     if (req.body.address) {
//         next();
//     } else {
//     res.status(400).json("Address is required");
//     }
// }
public rules = () => {
    return [
        body("email").isEmail(),
        body("name").isString(),
        body("address").isString(),
        body("mobile").isLength({min: 10, max: 10}).isInt(),
        body("pincode").isString().isLength({min: 6, max: 6}),
        body("id").isEmpty(),
        // custom password validator
        // body("pass", "password does not match").custom((value, {req}) => {
        //     if (req.body.cpass === req.body.pass) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // }),
    ];
}
public validate = (req: any, res: any, next: any) => {
    // console.log(req);
const errors = validationResult(req);
if (errors.isEmpty()) {
 next();
} else {
    const error: object[] = [];
    errors.array().map((err) => { error.push({ [err.param]: err.msg }); });

    res.status(400).json({errors: error});
}
}
}
export default new CustomerValidator();
