const Auth = require("../models/Auth");
const jwt = require("jsonwebtoken");

const { getMessaging } = require("firebase-admin/messaging");



// test
exports.test = async(req, res) => {
    try {


        const receivedToken = 'cQE9A2nARPuofH0GfZeH9h:APA91bHp8wy9NZ6oLQjeR-ACTo_Necy7t6G1HmCueTUAG2t5kJxWyHhCgvd4nkFieSw798EDArFCpW1-RV9FX0olZUbx4YuSQ6R-1_1Vm9WsnKE7o9xHpvJnev2qSlh_tK4c5-yy3c44';

        const message = {
            notification: {
                title: "Notif",
                body: 'This is a Test Notification'
            },
            data: { Key1: 'ValueSomething', AgainKey: 'NewHelp', OwnKey: '12345' },
            token: "cQE9A2nARPuofH0GfZeH9h:APA91bHp8wy9NZ6oLQjeR-ACTo_Necy7t6G1HmCueTUAG2t5kJxWyHhCgvd4nkFieSw798EDArFCpW1-RV9FX0olZUbx4YuSQ6R-1_1Vm9WsnKE7o9xHpvJnev2qSlh_tK4c5-yy3c44",
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