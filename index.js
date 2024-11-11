import express from 'express';
import fs from 'fs';
import path from 'path';


const app = express();
const PORT = 3000;

app.use(express.json());
