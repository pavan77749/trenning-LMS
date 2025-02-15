import express from 'express';
import isAuthenicated from "../middleware/isAuthenticated.js"
import { createCheckoutSession, stripeWebhook ,getAllPurchasedCourse,getCourseDetailWithPurchaseStatus} from '../controller/coursePurchase.controller.js';


const router = express.Router();

router.route('/checkout/create-checkout-session').post(isAuthenicated,createCheckoutSession);
router.route("/webhook").post(express.raw({type: 'application/json'}),stripeWebhook);
router.route("/course/:courseId/detail-with-status").get(isAuthenicated,getCourseDetailWithPurchaseStatus);

router.route("/").get(isAuthenicated,getAllPurchasedCourse);

export default router;