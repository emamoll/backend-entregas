require('dotenv').config();
const server = require('./service/server');
const { initMongoDB } = require('./service/databases');

const init = async () => {
    await initMongoDB();

    const puerto = process.env.PORT || 8080;

    server.listen(puerto, () => console.log(`Server up en puerto ${puerto}`));
};

init()