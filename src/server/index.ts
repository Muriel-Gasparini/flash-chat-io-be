import Express from 'express'

import { variables } from '../config/envs'
import { connectOnDatabase } from '../database/connection'
import { setMiddlewares } from './middlewares/set-middlewares'
import { setRoutes } from './routes'

const app = Express()

connectOnDatabase()
setMiddlewares(app)
setRoutes(app)

app.listen(variables.port, () => console.log(`Server Online on Port ${variables.port}`))
