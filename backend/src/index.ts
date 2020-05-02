import dotenv from 'dotenv';

dotenv.config();

import app from './app';
import './database';

(async () => {
    await app.listen(app.get('port'));
    console.log('server', app.get('port'));
})();