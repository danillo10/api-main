module.exports = {
  formaterErrors: (res, status, message) => {
    return res
      .status(status)
      .json({ errors: { status: status, message: message } })
  },

  formError: (res, status, errors) => {
    if (errors.details) {
      const { message, path, type, context } = errors.details[0]
      res.status(status).json({
        errors: {
          status: status,
          message: message,
          path: path,
          type: type,
          context: context
        }
      })
    } else {
      res.json(errors)
    }
  },

  serverError: (res) => {
    return res.status(500).json({
      errors: { status: 500, message: 'Requisição não pode ser atendida.' }
    })
  }
}
