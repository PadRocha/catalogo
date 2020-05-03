import dotenv from 'dotenv';
const fmt = require('fmt');

dotenv.config();

import app from './app';
import './database';

(async () => {
    const server = await app.listen(app.get('port'));
    fmt.sep();
    fmt.title('Ts RES API {catálogo}');
    fmt.field('\x1b[37mServer', `\x1b[33m${app.get('port')}\x1b[0m`);
    fmt.field('\x1b[37mStatus', `\x1b[33m${app.get('env')}\x1b[0m`);

})();