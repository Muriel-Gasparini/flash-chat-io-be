import { NextFunction, Request, Response } from 'express'

function RequestBodyValidator (req: Request, res: Response, next: NextFunction): Response | void {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const schema = require(`./schemas${req.path}`).default

  const { error } = schema.validate(req.body)

  if (error) return res.status(400).json({ error: error.message.replace(/"+/g, '') })

  next()
}

export { RequestBodyValidator }
