import * as express from 'express'
import config from './config/config'
import logger from './middleware/logger'
import { parser, jsonParser } from './middleware/parser'
import rootRouter from './routes/root.routes'
import connect from './db/connect'
import * as passport from 'passport'

const app = express()

app.use(parser)
app.use(jsonParser)
app.use(logger)

// app.use(passport.initialize())
// app.use(passport.session())
app.use('/api', rootRouter)
app.use((req: express.Request, res: express.Response) =>
  res.status(404).send({ message: 'route not found' })
)

connect
  .then(async (connection) => {
    app.listen(config.port, config.hostname, () =>
      console.log(
        `Server is running on http://${config.hostname}:${config.port}`
      )
    )
  })
  .catch((error) => console.log(error))
