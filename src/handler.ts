import { IncomingMessage, ServerResponse } from "http";
import { readFile, writeFile } from "fs/promises";

export const handler = async (req: IncomingMessage, res: ServerResponse) => {

    //Allow the frontend to communicate with the server
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle browser CORS preflight request
    if (req.method === "OPTIONS") {
        res.statusCode = 204;
        res.end();
        return;
    }

    // Level 1 code
    if (req.method === "POST" && req.url === "/resultLevel1")
            {
                let body = "";

                req.on("data", data => {
                    body += data.toString();
                });

                req.on("end", async () => {
                    const result = JSON.parse(body);

                    console.log(result);

                    const fileData = await readFile("resultsLevel1.json", "utf8");
                    const results = JSON.parse(fileData);
                    results.push(result);

                    await writeFile("resultsLevel1.json", JSON.stringify(results, null, 2));

                    res.end("Result received.");
                });

                return;
            }

            // GET - retrieve all results
            if (req.method === "GET" && req.url === "/resultsLevel1")
            {
                const fileData = await readFile("resultsLevel1.json", "utf8");
                res.setHeader("Content-Type", "application/json");
                res.end(fileData);
                return;
            }

            // GET - display leaderboard
            if (req.method === "GET" && req.url === "/leaderboardLevel1")
            {
                const page = await readFile("public/leaderboard1.html", "utf8");
                res.setHeader("Content-Type", "text/html");
                res.end(page);
                return;
            }
        //res.end("Hello, World.");



        //level 2 code
            if (req.method === "POST" && req.url === "/resultLevel2")
            {
                let body = "";

                req.on("data", data => {
                    body += data.toString();
                });

                req.on("end", async () => {
                    const result = JSON.parse(body);

                    console.log(result);

                    const fileData = await readFile("resultsLevel2.json", "utf8");
                    const results = JSON.parse(fileData);
                    results.push(result);

                    await writeFile("resultsLevel2.json", JSON.stringify(results, null, 2));

                    res.end("Result received.");
                });

                return;
            }

            // GET - retrieve all results
            if (req.method === "GET" && req.url === "/resultsLevel2")
            {
                const fileData = await readFile("resultsLevel2.json", "utf8");
                res.setHeader("Content-Type", "application/json");
                res.end(fileData);
                return;
            }

            // GET - display leaderboard
            if (req.method === "GET" && req.url === "/leaderboardLevel2")
            {
                const page = await readFile("public/leaderboard.html", "utf8");
                res.setHeader("Content-Type", "text/html");
                res.end(page);
                return;
            }
        res.end("Hello, World.");
    }

//Whenever a request comes in, respond with "Hello World."t comes in, respond with "Hello World."
//Whenever a request comes in, respond with "Hello World."
