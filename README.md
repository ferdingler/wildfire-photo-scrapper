## wildfire-photo-scrapper

```bash
.
├── README.MD                   <-- This instructions file
├── hello-world                 <-- Source code for the lambda function
│   └── app.js                  <-- Lambda function code
│   └── package.json            <-- NodeJS dependencies and scripts
├── template.yaml               <-- SAM template
```

## Packaging and deployment

1. Create an artifacts S3 bucket

```bash
aws s3 mb s3://BUCKET_NAME
```

2. Next, run the following command to package our Lambda function to S3:

```bash
sam package \
    --output-template-file packaged.yaml \
    --s3-bucket REPLACE_THIS_WITH_YOUR_S3_BUCKET_NAME
```

3. Next, the following command will create a Cloudformation Stack and deploy your SAM resources.

```bash
sam deploy \
    --template-file packaged.yaml \
    --stack-name sam-app \
    --capabilities CAPABILITY_IAM
```