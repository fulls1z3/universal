// polyfills
import 'zone.js/dist/zone-node';
// tslint:disable-next-line
import 'reflect-metadata';
import 'rxjs/Rx';

// angular
import { enableProdMode } from '@angular/core';

// libs
import * as express from 'express';
import * as compression from 'compression';
import { ngExpressEngine } from '@nguniversal/express-engine';

// module
import { AppServerModule } from './app/app.server.module';

enableProdMode();
const server = express();
server.use(compression());

server.engine('html', ngExpressEngine({
  bootstrap: AppServerModule
}));

server.set('view engine', 'html');
server.set('views', 'public');
server.use('/', express.static('public', {index: false}));

server.get('*', (req, res) => {
  res.render('../public/index.html', {
    req,
    res
  });
});

const PORT = process.env.PORT || 8000;
const HOST = process.env.BASE_URL || 'localhost';
const baseUrl = `http://${HOST}:${PORT}`;

server.set('port', PORT);

server.listen(server.get('port'), () => {
  // tslint:disable-next-line
  console.log(`Express server listening on ${baseUrl}`);
});
