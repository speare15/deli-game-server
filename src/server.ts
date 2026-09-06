import { createServer } from "http";
import { handler } from "./handler";

const port = process.env.PORT || 3000;

const server = createServer(handler);

server.listen(port, "0.0.0.0", () => {
    console.log(`Server listening on port ${port}`);
});
