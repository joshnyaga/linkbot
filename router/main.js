const express = require("express");
const router = express.Router();
router.get("/signup", async(req,res,error)=>{
    return res.status(200).json({"message": "hello"})
});
module.exports = router;