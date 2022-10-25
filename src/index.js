// VARIÁVEIS DE AMBIENTE
require('dotenv').config()

// PACOTES
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

// VARIÁVEIS DE CONFIGURAÇÃO
const corsConfig = require('./config/cors')
const mainConfig = require('./config/main')

// START
const app = express()

// FORÇAR HTTPS
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] == 'http')
    res.redirect(`https://${req.headers.host}${req.url}`)
  else {
    next()
  }
})

// LOGS
app.use(morgan('dev'))

// ARQUIVOS ESTATICOS
app.use('/public', express.static(`public`))
app.use('/public/media', express.static(`public/media`))

// CORS
app.use(cors(corsConfig))
app.disable('x-powered-by')

// SETUP REQ
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// ROTAS
const routes = require('./routes')
app.use('/', routes)

// TRATAMENTO DO ERRO 404
// app.use((req, res, next) => {
//   const err = new Error("Not Found");
//   err.status = 404;
//   next(err);
// });

// TRATAMENTO DOS ERROS 422, 500, 401
// app.use((err, req, res, next) => {
//   res.status(err.status || 500);
//   if (err.status !== 404) console.warn("Error: ", err.message, new Date());
//   res.json(err);
// });

// LISTEN
app.listen(mainConfig.port)
