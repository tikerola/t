import express, { Request, Response } from "express";
import { accessoryRouter } from "./routes/accessories";
import { jacketsRouter } from "./routes/jackets";
import { shirtsRouter } from "./routes/shirts";
import path from "path";

const app = express();
app.use(express.static("build"));

/* Routes */

app.use(jacketsRouter);
app.use(shirtsRouter);
app.use(accessoryRouter);

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "../", "build", "index.html"));
});

export { app };
