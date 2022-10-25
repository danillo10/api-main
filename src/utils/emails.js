const nodemailer = require('nodemailer')

const sendEmailRecoverPassword = async (values) => {
  const {
    emailMessage,
    emailTo,
    emailFrom,
    smtpHost,
    smtpPort,
    smtpUser,
    smtpPass
  } = values
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: false,
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  })
  await transporter.sendMail({
    from: emailFrom,
    to: emailTo,
    replyTo: emailFrom,
    subject: `Redefinição de Senha.`,
    html: emailMessage
  })
}

const sendEmailStore = async (values) => {
  const {
    emailTo,
    emailFrom,
    emailMessage,
    smtpHost,
    smtpPort,
    smtpUser,
    smtpPass
  } = values
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: false,
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  })

  await transporter.sendMail({
    from: emailFrom,
    to: emailTo,
    replyTo: emailFrom,
    subject: `Cadastro de usuário.`,
    html: emailMessage
  })
}

module.exports = {
  sendEmailRecoverPassword,
  sendEmailStore
}
