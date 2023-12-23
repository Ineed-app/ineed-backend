const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: 'AKIAUBFHYX5ITC6AYH2L',
    secretAccessKey: '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'
});

const uploadFile = (fileName) => {
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);

    // Setting up S3 upload parameters
    const params = {
        Bucket: 'ineed-messages',
        Key: 'voices/ineed.3gp', // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};

uploadFile('./ineed.3gp');