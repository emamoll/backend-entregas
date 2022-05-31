import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import config from '../config';
import path from 'path';

const ttlSeconds = 60

const StoreOptions = {
    store: MongoStore.create({
        mongoUrl: config.MONGO_CONNECTION_STRING,
        crypto: {
            secret: 'squirrel'
        }
    }),
    secret: 'mySecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: ttlSeconds * 1000
    }
};

const users = [
    {
      name: 'emanuel'
    }
];

const app = express();

const publicPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session(StoreOptions));

app.set('view engine', 'pug');
const viewsPath = path.resolve(__dirname, '../../views');
app.set('views', viewsPath);

app.get('/login', (req, res) => {
    res.render('index');
});

app.post('/login', (req, res) => {
    const { name } = req.body;

    const index = users.findIndex((aUser) => aUser.name === name);
    
    if(index < 0)
        res.status(401).json({ msg: 'Ingrese un nombre valido' });
    else {
        const user = users[index];
        req.session.info = {
            loggedIn: true,
            contador: 1,
            name: user.name
        };
    
        res.json({ 
            msg: `Bienvenido ${user.name}`
        });

        
    };
});

app.get('/ingreso', (req, res) => {
    res.json({ msg: `Bienvenido ${req.session.info.name}`})
})

export default app;