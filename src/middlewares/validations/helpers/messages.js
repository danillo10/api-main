module.exports = {
  idMessages: (field) => ({
    'string.base': `"${field}" deve ser um texto`,
    'any.required': `Parâmetro "${field}" inexistente`,
    'string.empty': `Parâmetro "${field}" precisa ser preenchido`,
    'string.length': `"${field}" deve conter {#limit} caracteres`
  }),
  stringMessages: (field) => ({
    'string.base': `"${field}" deve ser um texto`,
    'any.required': `Campo "${field}" inexistente`,
    'string.empty': `Campo "${field}" precisa ser preenchido`,
    'any.only': `Campo "${field}" deve conter valores válidos`,
    'any.valid': `Campo "${field}" deve conter valores válidos`,
    'string.min': `"${field}" deve conter no mínimo {#limit} caracteres`,
    'string.max': `"${field}" deve conter no máximo {#limit} caracteres`,
    'string.length': `"${field}" deve conter {#limit} caracteres`,
    'string.email': `Informe um "${field}" com formato válido`
  }),
  numberMessages: (field) => ({
    'number.base': `"${field}" deve ser um número`,
    'any.required': `Campo "${field}" inexistente`,
    'number.empty': `Campo "${field}" precisa ser preenchido`
  }),
  dateMessages: (field) => ({
    'date.base': `"${field}" deve ser formato válido`,
    'any.required': `Campo "${field}" inexistente`,
    'date.empty': `Campo "${field}" precisa ser preenchido`,
    'date.format': `Campo "${field}" deve ser um formato válido`
  }),
  booleanMessages: (field) => ({
    'boolean.base': `"${field}" deve ser formato válido`,
    'any.required': `Campo "${field}" inexistente`,
    'boolean.empty': `Campo "${field}" precisa ser preenchido`
  }),
  passwordConfirmationMessage: {
    'any.base': `"Confirmação de Senha" deve ser um texto`,
    'any.required': `Campo "Confirmação de Senha" inexistente`,
    'any.empty': `Campo "Confirmação de Senha" deve ser preenchido`,
    'any.only': `"Confirmação de Senha" precisa ser igual a senha`
  }
}
