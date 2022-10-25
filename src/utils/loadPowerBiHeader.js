const qs = require('qs')
const axios = require('axios')
const Account = require('../models/Account')

const Model = new Account()

class LoadPowerBiHeader {
  constructor(request) {
    this.request = request
  }
  async handle() {
    const account = (
      await Model.findAllByField(
        { firm_id: this.request.payload.data.firm_id },
        ['client_id', 'username', 'password'],
        ['username', 'asc']
      )
    ).shift()
    const values = qs.stringify({
      grant_type: 'password',
      scope: 'openid',
      resource: 'https://analysis.windows.net/powerbi/api',
      client_id: account.client_id,
      username: account.username,
      password: account.password
    })
    const auth = await axios.post(
      'https://login.microsoftonline.com/common/oauth2/token',
      values
    )
    const headers = {
      headers: { authorization: `Bearer ${auth.data.access_token}` }
    }
    return { headers, auth }
  }
}

module.exports = LoadPowerBiHeader
