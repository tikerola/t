import express, { Request, Response } from "express";
import { accessoryRouter } from "./routes/accessories";
import { jacketsRouter } from "./routes/jackets";
import { shirtsRouter } from "./routes/shirts";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome");
});

/* Routes */

app.use(jacketsRouter);
app.use(shirtsRouter);
app.use(accessoryRouter);

export { app };
