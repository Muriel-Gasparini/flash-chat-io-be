import Joi from 'joi'

const emailRegex = /.+@.+\.com/

const schema = Joi.object({
  email: Joi.string().min(10).max(50).regex(emailRegex).required(),
  password: Joi.string().min(5).max(50).required()
})

export default schema
