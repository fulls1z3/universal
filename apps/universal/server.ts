// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
import 'zone.js/dist/zone-node';

// tslint:disable-next-line:ordered-imports
import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import * as compression from 'compression';
import * as express from 'express';
import { join } from 'path';

enableProdMode();

// tslint:disable-next-line:no-require-imports
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./server/main');

const server = express();
server.use(compression());

const PORT = process.env.PORT ? undefined : 4000;
const DIST_FOLDER = join(process.cwd(), 'dist/apps/universal');

server.engine(
  'html',
  ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [provideModuleMap(LAZY_MODULE_MAP)]
  })
);

server.set('view engine', 'html');
server.set('views', join(DIST_FOLDER, 'browser'));

server.use('/', express.static(join(DIST_FOLDER, 'browser'), { index: false }));

server.get('*', (req, res) => {
  res.render(join(DIST_FOLDER, 'browser', 'index.html'), {
    req,
    res
  });
});

server.set('port', PORT);

server.listen(server.get('port'), () => {
  // tslint:disable-next-line:no-console
  console.log(`Express server listening on PORT:${PORT}`);
});
