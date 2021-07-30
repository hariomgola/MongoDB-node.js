const chalk = require('chalk');
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
//Object desctruction
// const { MongoClient, ObjectId } = require('mongodb');


// Local connection
const connectionURL = "mongodb://127.0.0.1:27017"; // 'mongodb://localhost:27017'
const database_name = "task-manager";
const ObjectId = mongodb.ObjectId;


// Mongo Db global id
const mongo_id = () => {
    // Mongo db clinet id
    const ObjectId = mongodb.ObjectId;
    const id = new ObjectId();
    console.log(id);
    console.log(id.getTimestamp())
    console.log(id.id);
    console.log(id.id.length);
    console.log(id.toHexString());
}

// CRUD - Create
const insert_mongo = () => {
    // Connecting to mongo db
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        // call back function its called when we connect to the database
        if (error) {
            return console.log(chalk.red(`Mongo DB is Unable to connect Please Check.......`))
        }


        console.log(chalk.green(`Mongo DB connection Successfull..`))
        // db trying to maipulate
        const db = client.db(database_name);

        // code for inserting one entry
        db.collection('users').insertOne({
            name: 'Hariom',
            Language: 'node.js'
        }, (error, result) => {
            // call back function called when data is inserted
            if (error) {
                return console.log(chalk.red(`Unable to insert data into User`));
            }

            console.log(chalk.green(JSON.stringify(result)))
        });


        // code for inserting bulk entry
        db.collection('users').insertMany([
            {
                name: 'Aryan',
                Language: 'C#'
            },
            {
                name: 'Daksh',
                Language: 'Java'
            }
        ], (error, result) => {
            // call back function called when data is inserted
            if (error) {
                return console.log(chalk.red(`Unable to insert data into User`));
            }

            console.log(chalk.green(JSON.stringify(result)))
        });
    });
}

// CRUD - Read
const find_mongo = () => {
    // Connecting to mongo db
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        // call back function its called when we connect to the database
        if (error) {
            return console.log(chalk.red(`Mongo DB is Unable to connect Please Check.......`))
        }


        console.log(chalk.green(`Mongo DB connection Successfull..`))
        // db trying to maipulate
        const db = client.db(database_name);

        // finding one data
        db.collection('users').findOne({ name: 'Aryan' }, (error, result) => {
            if (error) {
                return console.log(chalk.red(`Unable to fetch data from MongoDB`));
            }
            console.log(result)
        })

        db.collection('users').findOne({ _id: new ObjectId("6102b94212c24cf6d2b1eed6") }, (error, result) => {
            if (error) {
                return console.log(chalk.red(`Unable to fetch data from MongoDB`));
            }
            console.log(result)
        })


        db.collection('users').find({ Language: 'node.js' }).toArray((error, result) => {
            console.log(result)
        });

        db.collection('users').find({ Language: 'node.js' }).count((error, result) => {
            console.log(result)
        });

    });
}


// CRUD - Update
const update_mongo = () => {
    // Connecting to mongo db
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        // call back function its called when we connect to the database
        if (error) {
            return console.log(chalk.red(`Mongo DB is Unable to connect Please Check.......`))
        }
        console.log(chalk.green(`Mongo DB connection Successfull..`))

        const db = client.db(database_name);

        // Update one data
        const updatePromise = db.collection('users').updateOne({
            _id: new ObjectId("6103a18c2ecf45c8403358bd")
        }, {
            $set: {
                name: 'Hari'
            }
        })

        updatePromise.then((result) => {
            console.log(result)
        }).catch((error) => {
            console.log(error)
        })

        /*
        // Also used promise in following ways
        db.collection('users').updateOne({
            _id: new ObjectId("6103a18c2ecf45c8403358bd")
        }, {
            $inc: {
                age: 1
            }
        }).then((result) => {
            console.log(result)
        }).catch((error) => {
            console.log(error)
        })
        */


        db.collection('users').updateMany({
            Language: 'Java'
        }, {
            $set: {
                Language: 'JavaScript'
            }
        }).then((result) => {
            console.log(result)
        }).catch((error) => {
            console.log(error)
        })

    })
}

const delete_mongo = () => {
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        // call back function its called when we connect to the database
        if (error) {
            return console.log(chalk.red(`Mongo DB is Unable to connect Please Check.......`))
        }
        console.log(chalk.green(`Mongo DB connection Successfull..`))

        const db = client.db(database_name);

        // delete one data
        db.collection('users').deleteOne({
            Language: 'JavaScript'
        }).then((result) => {
            console.log(result)
        }).catch((error) => {
            console.log(error)
        })

        // delete multiple command
        db.collection('users').deleteMany({
            Language: 'node.js'
        }).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error)
        })

    })
}



// Working functionality
// insert_mongo();
// find_mongo();
// update_mongo();
delete_mongo();