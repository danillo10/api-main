const jwt = require('jsonwebtoken')
const { formaterErrors } = require('../../utils/errorHandling')
const mainConfig = require('../../config/main')

const message = 'Acesso não autorizado'

const authorization = (type) => (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    formaterErrors(res, 404, 'Token não informado')
    return
  }

  try {
    req.payload = jwt.verify(token, mainConfig.secretKey)
    if (req.payload.data.type !== type) {
      formaterErrors(res, 404, message)
      return
    }
    next()
  } catch (e) {
    formaterErrors(res, 404, message)
  }
}

const auth = {
  user: authorization('user'),
  admin: authorization('admin')
}

module.exports = auth
