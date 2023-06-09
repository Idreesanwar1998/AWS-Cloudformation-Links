# Introduction to AWS Cloudformation Links

When writing Cloudformation templates it is a common requirement to view the documentation of the types that are included in the template file. To do this, usually you can copy and paste the value of the "Type" field into a browser and looking for the documentation link in the browser.

To simplify this process, the AWS Cloudformation Links extension provides a hover feature which shows a link to the AWS documentation when you hover over the Type field of your resources in Cloudformation.

## Known Issues

The following resources are currently not supported by the AWS Cloudformation Links extension.

-   AWS::Serverless::Function
-   AWS::CloudFormation::CustomResource
-   AWS::S3::BucketPolicy
-   AWS::EC2::SecurityGroup
-   AWS::EC2::SecurityGroupIngress
-   AWS::EC2::VPCGatewayAttachment
