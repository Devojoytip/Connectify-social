let mongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017";

exports.connectMongo = function (cb)
{ 
    mongoClient.connect(url, function (err, client) 
    {
        if(err) cb({success: false});
        else
        {
            let dbObj=client.db("social_media_app_db");
            cb({success: true, dbObj: dbObj})
        }
    });
}