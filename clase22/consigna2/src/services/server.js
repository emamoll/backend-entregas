import express from 'express';
import path from 'path';
import * as http from 'http';

const app = express();

const publicPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'pug');
const viewsPath = path.resolve(__dirname, '../../views');
app.set('views', viewsPath);

app.get('/', (req, res) => {
    res.render('index');
});

const myServer = new http.Server(app);

export default myServer;

