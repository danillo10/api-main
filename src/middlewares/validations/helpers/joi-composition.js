const Joi = require('joi')
const {
  stringMessages,
  numberMessages,
  booleanMessages,
  passwordConfirmationMessage
} = require('./messages')

const intRequired = Joi.number().integer().required().empty()
const int = Joi.number().integer()
const boolean = Joi.boolean()
const stringRequired = Joi.string().required().empty()
const emailRequired = Joi.string().email().required().empty()
const string = Joi.string().empty('')
const cnpjRequired = Joi.string().required().empty().length(14)
const passwordConfirmation = Joi.any()
  .required()
  .empty()
  .valid(Joi.ref('password'))
  .messages(passwordConfirmationMessage)

module.exports = {
  intRequired: (field) => intRequired.messages(numberMessages(field)),
  int: (field) => int.messages(numberMessages(field)),
  boolean: (field) => boolean.messages(booleanMessages(field)),
  stringRequired: (field) => stringRequired.messages(stringMessages(field)),
  emailRequired: (field) => emailRequired.messages(stringMessages(field)),
  string: (field) => string.messages(stringMessages(field)),
  cnpjRequired: (field) => cnpjRequired.messages(stringMessages(field)),
  passwordConfirmation: () => passwordConfirmation
}
