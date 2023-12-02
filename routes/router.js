const express = require('express');
const router = express.Router();
// const verify = require("./verifytoken");
// const outletverify = require("./outletverify");

const authcontroller = require("../controllers/auth");
// const outletcontroller = require("../controllers/outlet");
// const qrcontroller = require("../controllers/qrcode");


// Auth
router.post("/register", authcontroller.register);

// Test
router.get("/test", authcontroller.test);

module.exports = router;