import Stripe from "stripe"
import {Course} from "../models/course.model.js"
import {CoursePurchase} from "../models/purchaseCourse.model.js"
import {Lecture} from "../models/lecture.model.js"
import {User} from "../models/user.model.js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const createCheckoutSession = async (req, res) => {
    try {
        const userId = req.id;
        const { courseId } = req.body;
        const course = await Course.findById(courseId);
        if(!course) return res.status(404).json({ message: "Course not found!" });
        
        //Create a new Course Purchase Record
        const newPurchase = new CoursePurchase({
            userId,
            courseId,
            amount: course.coursePrice,
            status: "pending"
        });
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
              {
                price_data: {
                  currency: "inr",
                  product_data: {
                    name: course.courseTitle,
                    images: [course.courseThumbnail],
                  },
                  unit_amount: course.coursePrice * 100, // Amount in paise (lowest denomination)
                },
                quantity: 1,
              },
            ],
            mode: "payment",
            success_url: `https://trenning-lms.vercel.app/course-progress/${courseId}`, // once payment successful redirect to course progress page
            cancel_url: `https://trenning-lms.vercel.app/course-detail/${courseId}`,
            metadata: {
              courseId: courseId,
              userId: userId,
            },
            shipping_address_collection: {
              allowed_countries: ["IN"], // Optionally restrict allowed countries
            },
          });
          console.log(session);
          if (!session.url) {
            return res
              .status(400)
              .json({ success: false, message: "Error while creating session" });
          }
      
          // Save the purchase record
          newPurchase.paymentId = session.id;
          await newPurchase.save();
      
          return res.status(200).json({
            success: true,
            url: session.url, // Return the Stripe checkout URL
          });
    } catch (error) {
        console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };

    export const stripeWebhook = async (req, res) => {
        const signature = req.headers['stripe-signature'];
        let event;
      
        try {
          // Get the raw body as a buffer
          const payload = req.body;
          const secret = process.env.WEBHOOK_ENDPOINT_SECRET;
      
          // Verify the event came from Stripe
          event = stripe.webhooks.constructEvent(
            payload, 
            signature, 
            secret
          );
        } catch (error) {
          console.error("Webhook signature verification failed:", error.message);
          return res.status(400).send(`Webhook Error: ${error.message}`);
        }
      
        // Handle the event
        if (event.type === 'checkout.session.completed') {
          // Process the payment...
          // Your existing code for handling completed checkout
        }
      
        // Return a 200 response to acknowledge receipt of the event
        res.status(200).json({received: true});
    };

      export const getCourseDetailWithPurchaseStatus = async (req, res) => {
        try {
          const { courseId } = req.params;
          const userId = req.id;
      
          const course = await Course.findById(courseId)
            .populate({ path: "creator" })
            .populate({ path: "lectures" });
      
          const purchased = await CoursePurchase.findOne({ userId, courseId });
          console.log(purchased);
      
          if (!course) {
            return res.status(404).json({ message: "course not found!" });
          }
      
          return res.status(200).json({
            course,
            purchased: !!purchased, // true if purchased, false otherwise
          });
        } catch (error) {
          console.log(error);
        }
      };
      
      export const getAllPurchasedCourse = async (_, res) => {
        try {
          const purchasedCourse = await CoursePurchase.find({
            status: "completed",
          }).populate("courseId");
          if (!purchasedCourse) {
            return res.status(404).json({
              purchasedCourse: [],
            });
          }
          return res.status(200).json({
            purchasedCourse,
          });
        } catch (error) {
          console.log(error);
        }
      };