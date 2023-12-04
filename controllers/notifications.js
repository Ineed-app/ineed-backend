const Auth = require("../models/Auth");
const jwt = require("jsonwebtoken");

const { getMessaging } = require("firebase-admin/messaging");



// test
exports.test = async(req, res) => {
    try {


        const receivedToken = 'AAAAp_ti30Q:APA91bEoQmHP1-p0eGKzQgVJ4sFHDA0y1kjnI02lLXOzUSyIUj44QsABQX7QWrslFXa-TklvIB0doPOdtW_qELhXVmLnUnAjnYvnrnz7M7rd9tf0AZUWC86z7GuTo2T05QybZ0VkqKzK';

        const message = {
            notification: {
                title: "Notif",
                body: 'This is a Test Notification'
            },
            data: { Key1: 'ValueSomething', AgainKey: 'NewHelp', OwnKey: '12345' },
            token: "fErwoSp-Tce7rIBAo4WUY_:APA91bExJTNS5LVWozZfm2Ke8zSvf7uTX2XLneOrlAGNgaQj4gglzc7-1Rv_iN-5tMcAD0Z38HwCEowRGXlzsiXg8-fHD9Mps36kwocTa0Kmd42y36agyubC9BXl3AqiZCOhl4v0Z0pV",
        };

        getMessaging()
            .send(message)
            .then((response) => {
                res.status(200).json({
                    message: "Successfully sent message",
                    token: receivedToken,
                });
                console.log("Successfully sent message:", response);
            })
            .catch((error) => {
                res.status(400);
                res.send(error);
                console.log("Error sending message:", error);
            });

    } catch (error) {
        return res.status(400).json({ message: error });
    }
};