const express = require('express');
const router = express.Router();
// const verify = require("./verifytoken");
// const outletverify = require("./outletverify");

const authcontroller = require("../controllers/auth");
const notificationcontroller = require("../controllers/notifications");
const verify = require('../utils/verifytoken');
// const qrcontroller = require("../controllers/qrcode");


// Auth
router.post("/register", authcontroller.register);
router.put("/updatename", verify, authcontroller.updatename);
router.get("/user", verify, authcontroller.getuser);

//Notifications
router.post('/notification/test', notificationcontroller.test);

// Test
router.get("/test", authcontroller.test);

module.exports = router;