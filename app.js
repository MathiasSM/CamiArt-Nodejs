'use strict';

const path = require('path');

const compression = require('compression')
const express = require('express');
const app = express();
const router = express.Router();

const raiz = path.join(__dirname, 'app');

app.use(compression());
app.use(express.static( '.tmp' ) );
app.use('/images',  express.static( path.join(raiz,'images') ) );
app.use('/scripts', express.static( path.join(raiz,'scripts') ) );
app.use('/styles',  express.static( path.join(raiz,'styles') ) );
app.get('/', (req, res) => res.sendFile( path.join(raiz,'index.html') ) );
 
app.listen(5000); 