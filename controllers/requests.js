const MyRequest = require("../models/Request");

exports.addrequest = async(req, res) => {
    try {
        const newrequest = await MyRequest({
            sender_id: req.device_id,
            request: req.body.request
        })
        if (newrequest.save()) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const mydoc = await MyRequest.findOne({ _id: newrequest._id })
            console.log(mydoc)
            return res.status(200).json(mydoc);
        } else
            return res.status(400).json({ message: "new request not added" });
    } catch (error) {
        return res.status(400).json({ message: 'Something went wrong' });
    }
};

exports.acceptrequest = async(data) => {
    try {
        const myrequest = await MyRequest.findOne({ request_id: data.request_id });
        console.log("myrequest.accept  " + myrequest.accept);
        if (myrequest.accept)
            return false;
        const update_request = await MyRequest.updateOne({ request_id: data.request_id }, { $set: { receiver_id: data.receiver_id, accept: true } });
        if (update_request)
            return true;
        else
            return false;

    } catch (error) {
        return false;
    }
};

exports.requeststatus = async(req, res) => {
    try {
        if (!req.params.request_id)
            return res.status(400).json({ message: "request_id is required" });

        const myrequest = await MyRequest.findOne({
            request_id: req.params.request_id,
            "$or": [
                { sender_id: req.device_id },
                { receiver_id: req.device_id }
            ],
            accept: true
        });
        if (myrequest)
            return res.status(200).json(myrequest);
        else
            return res.status(400).json({ message: 'Sorry, this request has been served by someone.' });
    } catch (error) {
        return res.status(400).json({ message: 'Something went wrong' });
    }
};