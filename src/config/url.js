const { NODE_URL_ELLEVE, NODE_URL_APP, NODE_URL_API, NODE_URL_ADMIN } =
  process.env

const urlConfig = {
  urlElleve: NODE_URL_ELLEVE,
  urlApp: NODE_URL_APP,
  urlApi: NODE_URL_API,
  urlAdmin: NODE_URL_ADMIN
}

module.exports = urlConfig
