'use strict';

const path = require('path');

const express       = require('express');
const compression   = require('compression')
//const serveStatic   = require('serve-static');

const port    = process.env.PORT || 3000;
const domain  =  process.env.DOMAIN;

const app = express();
const router = express.Router();

const raiz = path.join(__dirname, 'app');

function ensureDomain(req, res, next) {
  if (!domain || req.hostname === domain) {
    // OK, continue
    return next();
  };

  // handle port numbers if you need non defaults
  res.redirect(`http://${domain}${req.url}`);
};

app.all('*', ensureDomain);

app.use(compression());
app.use(express.static( '.tmp' ) );
app.use('/images',  express.static( path.join(raiz,'images') ) );
app.use('/scripts', express.static( path.join(raiz,'scripts') ) );
app.use('/styles',  express.static( path.join(raiz,'styles') ) );
app.get('/', (req, res) => res.sendFile( path.join(raiz,'index.html') ) );
 
app.listen(port, () => {
  console.log('Server running...');
});