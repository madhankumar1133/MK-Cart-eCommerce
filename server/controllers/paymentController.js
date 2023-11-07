const catchAsyncError = require("../middlewares/catchAsyncError");
const stripe=require("stripe")(process.env.STRIPE_SECRET_KEY)
//,{timeout:120000}
   

exports.processPayment=catchAsyncError(async(req,res,next)=>{
    // const paymentIntent=await stripe.paymentIntents.create({
    //     amount:req.body.amount,
    //     currency:"usd",
    //     description:"TEST PAYMENT",
    //     metaData:{integration_check:"accept_payment"},
    //     shipping:req.body.shipping
    // })
    // res.status(200).json({
    //     success:true,
    //     client_secret:paymentIntent.client_secret
    // })
    try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: req.body.amount,
          currency: "usd",
          description: "TEST PAYMENT",
          metadata: { integration_check: "accept_payment" },
          shipping: req.body.shipping
        });
        res.status(200).json({
          success: true,
          client_secret: paymentIntent.client_secret
        });
      } catch (error) {
        // Handle the error here, you can log it or send a specific response to the client.
        res.status(500).json({
          success: false,
          error: "Payment processing failed",
          message: error.message
        });
    }
})

exports.sendStripeApi=catchAsyncError(async(req,res,next)=>{
    
    res.status(200).json({
        success:true,
        stripeApiKey:process.env.STRIPE_API_KEY
    })
})