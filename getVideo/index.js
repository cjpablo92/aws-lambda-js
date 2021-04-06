'use strict'
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10'});
    const documentClient = new AWS.DynamoDB.DocumentClient();
    const tableName = 'Videos';
    let response = {
        statusCode : 200
    }
    if (event.params || event.params.id) {
        const params = {
            TableName: tableName,
            Key: {
                id: event.params.id
            }
        }
        try {
            const data = await documentClient.get(params).promise();
            response.body = data;
        } catch (err) {
            console.log(err);
            response.statusCode = 500;
            response.body = JSON.stringify("Unexpected error");
        }
    } else {
        response.statusCode = 400;
        response.body = JSON.stringify("Bad request");
    }
    return response;
}