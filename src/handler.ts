import { IncomingMessage, ServerResponse } from "http";
import { readFile } from "fs/promises";
import { MongoClient } from "mongodb";

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
    throw new Error("MONGODB_URI environment variable is not set.");
}

const client = new MongoClient(mongoUri);

const db = client.db("deliGame");

export const handler = async (req: IncomingMessage, res: ServerResponse) => {

    // Allow the frontend to communicate with the server
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle browser CORS preflight request
    if (req.method === "OPTIONS") {
        res.statusCode = 204;
        res.end();
        return;
    }

    // Level 1 - save result
    if (req.method === "POST" && req.url === "/resultLevel1")
    {
        let body = "";

        req.on("data", data => {
            body += data.toString();
        });

        req.on("end", async () => {
            try {
                const result = JSON.parse(body);

                console.log(result);

                const collection = db.collection("resultsLevel1");

                await collection.insertOne(result);

                res.end("Result received.");
            }
            catch (error) {
                console.error(error);
                res.statusCode = 500;
                res.end("Error saving result.");
            }
        });

        return;
    }

    // Level 1 - retrieve all results
    if (req.method === "GET" && req.url === "/resultsLevel1")
    {
        try {
            const collection = db.collection("resultsLevel1");

            const results = await collection.find({}).toArray();

            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(results));
        }
        catch (error) {
            console.error(error);
            res.statusCode = 500;
            res.end("Error retrieving results.");
        }

        return;
    }

    // Level 1 - display leaderboard
    if (req.method === "GET" && req.url === "/leaderboardLevel1")
    {
        const page = await readFile("public/leaderboard1.html", "utf8");

        res.setHeader("Content-Type", "text/html");
        res.end(page);

        return;
    }


    // Level 2 - save result
    if (req.method === "POST" && req.url === "/resultLevel2")
    {
        let body = "";

        req.on("data", data => {
            body += data.toString();
        });

        req.on("end", async () => {
            try {
                const result = JSON.parse(body);

                console.log(result);

                const collection = db.collection("resultsLevel2");

                await collection.insertOne(result);

                res.end("Result received.");
            }
            catch (error) {
                console.error(error);
                res.statusCode = 500;
                res.end("Error saving result.");
            }
        });

        return;
    }

    // Level 2 - retrieve all results
    if (req.method === "GET" && req.url === "/resultsLevel2")
    {
        try {
            const collection = db.collection("resultsLevel2");

            const results = await collection.find({}).toArray();

            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(results));
        }
        catch (error) {
            console.error(error);
            res.statusCode = 500;
            res.end("Error retrieving results.");
        }

        return;
    }

    // Level 2 - display leaderboard
    if (req.method === "GET" && req.url === "/leaderboardLevel2")
    {
        const page = await readFile("public/leaderboard.html", "utf8");

        res.setHeader("Content-Type", "text/html");
        res.end(page);

        return;
    }

    res.end("Hello, World.");
};

//Whenever a request comes in, respond with "Hello World."t comes in, respond with "Hello World."
//Whenever a request comes in, respond with "Hello World."
