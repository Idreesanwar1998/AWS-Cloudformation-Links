import fetch from 'node-fetch';

export class LinkMappings {
    awsResourceDocumentationBaseUrl = 'https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-';
    awsPropertiesDocumentationBaseUrl =
        'https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-';

    /// attempts to get the link for the docs of the type that is being hovered over.
    /// Makes a request to the pages in question to check if the page exists
    public async getLink(awsTypeText: string): Promise<string> {
        if (awsTypeText && awsTypeText.includes('Type')) {
            let formattedAwsTypeText = this.formatText(awsTypeText);
            let splitResourceType = formattedAwsTypeText.split('::');

            if (splitResourceType[0] === 'AWS' && splitResourceType.length === 3) {
                let resourceUrl =
                    this.awsResourceDocumentationBaseUrl +
                    splitResourceType[1].toLowerCase() +
                    '-' +
                    splitResourceType[2].toLowerCase();
                let propertiesUrl =
                    this.awsPropertiesDocumentationBaseUrl +
                    splitResourceType[1].toLowerCase() +
                    '-' +
                    splitResourceType[2].toLowerCase();
                let urlPrefixText = 'Find documentation for this resource at: ';

                // Check if there is a properties page for this type
                let propertiesUrlResponse = await fetch(propertiesUrl);
                if (propertiesUrlResponse.status === 200) {
                    return urlPrefixText + propertiesUrl;
                }
                // Check if there is a resource page for this type
                let resourcesUrlResponse = await fetch(resourceUrl);
                if (resourcesUrlResponse.status === 200) {
                    return urlPrefixText + resourceUrl;
                }
            }
        }
        return null;
    }

    /// formats the text so that it can be used to build the docs URL
    formatText(unformattedAwsType: string): string {
        let commentsRemoved = unformattedAwsType.split('#')[0];
        let formattedAwsTypeText = commentsRemoved.split('Type:')[1].trim().replace(/['"]+/g, '');
        return formattedAwsTypeText;
    }
}
