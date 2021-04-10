import Joi from 'joi'

const emailRegex = /.+@.+\.com/

const schema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().min(10).max(50).regex(emailRegex).required(),
  birthdate: Joi.date().required(),
  password: Joi.string().min(5).max(50)
})

export default schema
