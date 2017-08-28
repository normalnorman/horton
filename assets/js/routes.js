'use strict';

module.exports = function(app) {

    //horton spanner details
    const instanceId = "horton-db";
    const databaseId = "horton-db";
    const feedbackTableId = "feedback";

    app.get('/', function(req, res) {
        //create spanner objects

        // Imports the Google Cloud client library
        const Spanner = require('@google-cloud/spanner');

        // Instantiates a client
        const spanner = Spanner();

        const instance = spanner.instance(instanceId);
        const database = instance.database(databaseId);

        const query = {
            sql: 'SELECT * FROM ' + feedbackTableId
        };

        // Queries rows from the Albums table
        database.run(query)
            .then((results) => {

                res.render('pages/index', { results: results });

                const rows = results[0];
                rows.forEach((row) => {
                    const json = row.toJSON();
                    console.log(`Headline: ${json.headline}, Date: ${json.date.value}, Notes: ${json.Notes}, Tags: ${json.Tags}`);
                });
            });

    });

    app.get('/about', function(req, res) {
        res.render('pages/about');
    });
};