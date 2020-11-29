
require("console-pretty-print");

const AWS = require("aws-sdk");

const isLambda = !!(process.env.LAMBDA_TASK_ROOT || false);

if (isLambda) {
    AWS.config.update({
        region: process.env.DROP_AWS_REGION
    });
} else {
    require("dotenv").config();
    AWS.config.update({
        accessKeyId: process.env.DROP_AWS_ACCESS_ID,
        secretAccessKey: process.env.DROP_AWS_SECRET_KEY,
        region: process.env.DROP_AWS_REGION
    });
}

// INIT AWS
// env variables set on Lambda function in AWS console

const docClient = new AWS.DynamoDB.DocumentClient();

const defaultParams = {
    TableName: "Metadata",

    AttributesToGet: [
        "ogTitle",
        "ogDescription",
        "ogKeywords",
        "ogImages",
    ]
};

const fetch = require('isomorphic-fetch');
const cheerio = require('cheerio')

const _getDataFromUrl = async url => {
    const response = await fetch(url)
    const parseText = await response.text();
    const $ = cheerio.load(parseText);
    let data = {
        title: $('h1').text() || '',
        description: $('meta[name="description"]').attr('content') || '',
        // Get OG Values
        ogTitle: $('meta[property="og:title"]').attr('content') || '',
        ogImages: $('meta[property="og:image"]').attr('content') || [],
        ogKeywords: $('meta[property="og:keywords"]').attr('content') || [],
        ogDescription: $('meta[property="og:description"]').attr('content') || '',
    }
    if (data.ogTitle && data.ogTitle.trim().length === 0) {
        data.ogTitle = data.title;
    }
    return data;
}

const checkCache = async params => {

    return new Promise((resolve, reject) => {
        docClient.get(params, (err, data) => {
            if (err) {
                console.log("error getting from dynamodb", err);
                reject({});
            } else {
                console.log("yay got data from dynamodb", data);
                resolve(data.Item);
            }
        });
    });
}

const setCache = async params => {
    return new Promise((resolve, reject) => {
        docClient.put(params, (err, data) => {
            if (err) {
                console.log("error getting from dynamodb", err);
                reject({});
            } else {
                console.log("Save Data to dynamodb", data);
                resolve(data);
            }
        });
    });
}

const fetchOgMetaData = async url => {
    const params = {
        ...defaultParams,
        Key: {
            url: url
        }
    };
    let _dataFound = await checkCache(params); //check cache if exits return from cache
    if (_dataFound && Object.keys(_dataFound).length > 0) {
        return _dataFound;
    }
    let data = await _getDataFromUrl(url); //else fetch and update the cache.
    data.url = url;
    setCache({
        TableName: 'Metadata',
        Item: data
    })
    return data;
};


module.exports = {
    fetchOgMetaData,
};