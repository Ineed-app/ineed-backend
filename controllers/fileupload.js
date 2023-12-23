const { S3Client } = require("@aws-sdk/client-s3");
const { response } = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new S3Client({
    region: process.env.AWS_DEFAULT_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_DEFAULT_REGION,
    },
    sslEnabled: false,
    s3ForcePathStyle: true,
    signatureVersion: "v4",
});

const upload = () =>
    multer({
        storage: multerS3({
            s3: s3,
            ACL: "public-read",
            bucket: process.env.AWS_BUCKET,
            metadata: function(req, file, cb) {
                cb(null, { fieldName: file.fieldname });
            },
            key: function(req, file, cb) {
                cb(null, new Date().getTime() + "-" + file.originalname);
            },
        }),
    });

exports.fileupload = async(req, res) => {
    try {
        const uploadsingle = upload().single("anyfile");
        uploadsingle(req, res, async(err) => {
            console.log(req.body, req.file);
            if (err) {
                return res.status(400).json({ success: false, message: err.message });
            }
            // validations
            if (req.file) {
                anyfile = req.file.location;
            }
            if (!anyfile)
                return res.status(400).json({ message: "file required" });

            response.anyfile = anyfile
            if (response) {
                return res.status(200).json(response);
            } else {
                return res.status(400).json({ mes: "Internal Server Error" });
            }
        });
    } catch (err) {
        return res.status(400).json({ message: err });
    }
};