import 'dotenv/config';
import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import imageUploader from './utils/imageUploader';

import { BooksRoutes, CategoriesRoutes } from './modules/routes';

const app = express();
const port = process.env.PORT || 3000;
const apiPrefix = '/api/v1';

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('short'));
app.use(bodyParser.json())

app.use(apiPrefix, BooksRoutes);
app.use(apiPrefix, CategoriesRoutes);

app.post(`${apiPrefix}/upload`, imageUploader.single('photo'), (req, res) => {
    if (req.file) {
        res.status(200).json({ imageUrl: `/images/${req.file.filename}` });
    } else {
        res.sendStatus(400);
    }
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});