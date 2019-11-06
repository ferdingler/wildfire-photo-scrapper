const axios = require('axios');
const AWS = require('aws-sdk');

let response;
const s3 = new AWS.S3();

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    try {

        let time = Date.now();
        console.log('Time=', time);

        const ret = await axios({
            method: 'get',
            url: 'http://s3-us-west-2.amazonaws.com/alertwildfire-data-public/Axis-PoleMt/latest_full.jpg?x-request-time=' + time,
            responseType: 'arraybuffer',
            headers: {
                'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
                'Referer': 'http://www.alertwildfire.org/northbay/index.html',
                'Accept-Encoding': 'gzip, deflate'
            }
        });

        console.log('Response from axios=', ret.statusCode);
        const upload = await s3.putObject({
            Body: ret.data, 
            Bucket: "fdingler-image-classification", 
            Key: "chriscarter/".concat(time).concat('.jpeg')
        }).promise();

        console.log('Upload=', upload);

    } catch (err) {
        console.log(err);
        return err;
    }

    return {
        'statusCode': 200,
        'body': 'Done',
    };
};
