const express = require('express');
const router = express.Router();
// const verify = require("./verifytoken");
// const outletverify = require("./outletverify");

const authcontroller = require("../controllers/auth");
const notificationcontroller = require("../controllers/notifications");
const verify = require('../utils/verifytoken');
const locationcontroller = require("../controllers/locations");


// Auth
router.post("/register", authcontroller.register);
router.put("/updatename", verify, authcontroller.updatename);
router.get("/user", verify, authcontroller.getuser);

//Notifications
router.post('/notification/test', notificationcontroller.test);

// Test
router.get("/test", authcontroller.test);

//Maps
router.post("/clocation", verify, locationcontroller.current_location)
router.delete("/del_clocation", verify, locationcontroller.del_clocation)
router.get("/locations", verify, locationcontroller.get_locations)

module.exports = router;