const express = require('express');
const router = express.Router();
// const verify = require("./verifytoken");
// const outletverify = require("./outletverify");

const authcontroller = require("../controllers/auth");
const notificationcontroller = require("../controllers/notifications");
const verify = require('../utils/verifytoken');
const locationcontroller = require("../controllers/locations");
const servicecatcontroller = require("../controllers/servicecat")
const servicecontroller = require("../controllers/services")
const messagecontroller = require('../controllers/messages')


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

// Service category
router.post("/servicecat", servicecatcontroller.post_servicecat)
router.delete("/servicecat/:servicecatid", servicecatcontroller.del_servicecat)
router.get("/servicecat", servicecatcontroller.getall_servicecat)
router.put("/servicecat/:servicecatid", servicecatcontroller.update_servicecat)
router.get("/servicecat_and_services", servicecatcontroller.getall_servicecat_services)

// Services
router.post("/services", servicecontroller.post_service)
router.delete("/services/:serviceid", servicecontroller.del_service)
router.get("/services", servicecontroller.getall_service)
router.put("/services/:serviceid", servicecontroller.update_service)

//messages
router.post("/message", verify, messagecontroller.send_message)
router.get("/onload", verify, messagecontroller.getallmessages)


module.exports = router;