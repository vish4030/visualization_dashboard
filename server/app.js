import express from 'express';
import cors from 'cors';

import dataRouter from "./routes/data.js";

export const app = express();

app.use(cors());
app.use(dataRouter);

