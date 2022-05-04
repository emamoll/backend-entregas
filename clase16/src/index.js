const app = require('./service/server');
const DBService  = require('./service/db');

const puerto = 8080;

DBService.init();

app.listen(puerto, () => console.log(`Server up en puerto ${puerto}`));