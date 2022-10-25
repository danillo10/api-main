const {
  NODE_EMAIL_HOST,
  NODE_EMAIL_PORT,
  NODE_EMAIL_USER,
  NODE_EMAIL_PASS,
  SENDGRID_API_KEY
} = process.env

const emailConfig = {
  sendgridApiKey: SENDGRID_API_KEY,
  host: NODE_EMAIL_HOST,
  port: NODE_EMAIL_PORT,
  auth: {
    user: NODE_EMAIL_USER,
    pass: NODE_EMAIL_PASS
  }
}

module.exports = emailConfig
