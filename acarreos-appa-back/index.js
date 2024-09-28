import "dotenv/config";
import express from 'express';
import unoRoute from "./routes/uno.route.js";
import dosRoute from "./routes/dos.route.js";
import tresRoute from "./routes/tres.route.js";

const app = express();
app.use(express.json());
app.use("/api", unoRoute);
app.use("/api", dosRoute);
app.use("/api", tresRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('server listening on port ' + PORT);
})