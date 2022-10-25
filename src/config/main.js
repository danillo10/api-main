const { PORT, NODE_SECRET } = process.env

const mainConfig = {
  port: PORT,
  secretKey: NODE_SECRET
}

module.exports = mainConfig
