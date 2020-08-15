const express = require("express")
const router = express.Router();
const userRoutes = require("./user/user")
const postRoutes = require("./posts/post")

router.get("/test",(req, res)=>{
  res.status(200).send("Hello there!!!")
})


router.use("/", userRoutes)
router.use("/", postRoutes)

// error handling
router.use((eq, res, next) => {
    const error = new Error("Invalid Endpoint");
    error.status = 404;
    next(error);
  });
  
  router.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });
  
  module.exports = router;