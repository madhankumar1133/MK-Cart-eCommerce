const express=require('express');
const { getProducts, newProduct, getSingleProduct, updateproduct, deleteProduct, createReview, getReviews, deleteReview, getadminProducts } = require('../controllers/productControllers');
const router=express.Router();
const {isAuthenticatedUser, authorizeRoles}=require('../middlewares/authenticate');
const multer =require('multer');
const path=require('path');


const upload=multer({storage:multer.diskStorage({
    destination: function(req,res,cb) {
        cb(null,path.join(__dirname,'..','uploads/product'))
    },
    filename:function(req,file,cb) {
        cb(null,file.originalname)
    }
})})

router.route('/products').get(getProducts);
router.route('/product/new').post(isAuthenticatedUser,authorizeRoles('admin'),newProduct);
router.route('/product/:id').get(getSingleProduct);
// router.route('/product/:id').put(updateproduct);
// router.route('/product/:id').delete(deleteProduct);
router.route('/review').put(isAuthenticatedUser,createReview);





// Admin routes
router.route('/admin/product/new').post( isAuthenticatedUser,authorizeRoles('admin'),upload.array('images') ,newProduct);
router.route('/admin/products').get( isAuthenticatedUser,authorizeRoles('admin'),getadminProducts);
router.route('/admin/products').get( isAuthenticatedUser,authorizeRoles('admin'),getadminProducts);
router.route('/admin/product/:id').delete( isAuthenticatedUser,authorizeRoles('admin'),deleteProduct);
router.route('/admin/product/:id').put( isAuthenticatedUser,authorizeRoles('admin'),upload.array('images'),updateproduct);
router.route('/admin/reviews').get(isAuthenticatedUser,authorizeRoles('admin'),getReviews);
router.route('/admin/review').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteReview);

module.exports=router;
