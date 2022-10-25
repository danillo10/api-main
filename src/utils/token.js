const jwt = require('jsonwebtoken')
const mainConfig = require('../config/main')

class Token {
  adminToken(data) {
    return {
      token: jwt.sign(
        {
          data: {
            id: data.id,
            name: data.name,
            email: data.email,
            file_url: data.file_url,
            type: 'admin'
          }
        },
        mainConfig.secretKey,
        { expiresIn: '15 days' }
      )
    }
  }

  userToken(data) {
    return {
      token: jwt.sign(
        {
          data: {
            id: data.id,
            name: data.name,
            email: data.email,
            file_url: data.file_url,
            firm_id: data.firm_id,
            roles: data.roles,
            type: 'user'
          }
        },
        mainConfig.secretKey,
        { expiresIn: '15 days' }
      )
    }
  }
}

module.exports = Token
