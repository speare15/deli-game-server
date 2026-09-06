import { createServer } from "http";
import { handler } from "./handler";

const port = 3000;

const server = createServer(handler);

server.listen(port, () => console.log(`Server listening on port ${port}`));

// This creates the HTTP server and tells it: "Listen on port 3000 and use 'handler' whenever a request arrives."
