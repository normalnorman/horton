'use strict';

//setup node/express app
var routes = require('./assets/js/routes.js');
const express = require('express');
const PORT = 8080;
const path = require("path");
const app = express();

//app.use('/public', express.static(process.cwd() + '/public'));
app.set('view engine', 'ejs');
routes(app);

//paths
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/assets/html/index.html'));
});

app.get('/add', function(req, res) {

    var data = [
        { date: spanner.date("06-23-17"), headline: 'this looks good', notes: 'I mean, real good', tags: ['containers', 'gke', 'cicd'] }
    ]

    //insertData(instanceId, databaseId, feedbackTableId, data);

    res.send('insert done');
});

app.get('/get', function(req, res) {
    res.send('querying data');

    //queryData(instanceId, databaseId, feedbackTableId);
});

//db functions
/*function insertData(instanceId, databaseId, tableId, data) {
    // Gets a reference to a Spanner instance and database
    const instance = spanner.instance(instanceId);
    const database = instance.database(databaseId);

    // Instantiate Spanner table objects
    const table = database.table(tableId);

    // Inserts rows into the table
    // Note: Cloud Spanner interprets Node.js numbers as FLOAT64s, so
    // they must be converted to strings before being inserted as INT64s
    table.insert(data);
    // [END insert_data]
}
*/
/*function queryData(instanceId, databaseId, tableId) {
    // [START query_data]
    // Imports the Google Cloud client library
    const Spanner = require('@google-cloud/spanner');

    // Instantiates a client
    const spanner = Spanner();

    // Uncomment these lines to specify the instance and database to use
    // const instanceId = 'my-instance';
    // const databaseId = 'my-database';

    // Gets a reference to a Cloud Spanner instance and database
    const instance = spanner.instance(instanceId);
    const database = instance.database(databaseId);

    const query = {
        sql: 'SELECT * FROM ' + tableId
    };

    // Queries rows from the Albums table
    database.run(query)
        .then((results) => {
            const rows = results[0];

            rows.forEach((row) => {
                const json = row.toJSON();
                console.log(`Headline: ${json.headline}, Date: ${json.date.value}, Notes: ${json.Notes}, Tags: ${json.Tags}`);
            });
        });
    // [END query_data]
}*/

//start app
app.listen(PORT);
console.log('Running on http://localhost:' + PORT);