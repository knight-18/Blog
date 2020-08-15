const express = require("express")
const router = express.Router();
const userRoutes = require("./user/user")
const postRoutes = require("./posts/post")
const auditTableRoutes = require("./auditTable");
const authMiddleware = require("../middleware/auth");


router.use("/", userRoutes)
router.use("/", postRoutes)
router.get("/api/audit", authMiddleware, auditTableRoutes)

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