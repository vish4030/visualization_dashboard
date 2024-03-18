import express from 'express';

import dataRouter from "./routes/data.js";

export const app = express();

app.use(dataRouter);

