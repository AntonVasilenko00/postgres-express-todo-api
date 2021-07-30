import * as express from 'express'
import config from './config/config'
import logger from './middleware/logger'
import parser from './middleware/parser'
import rootRouter from './routes/root.routes'
import tryDBConnect from './middleware/tryDBConnect'

const app = express()

app.use(parser)
app.use(logger)
app.use(tryDBConnect)

app.use('/api', rootRouter)
app.use((req: express.Request, res: express.Response) => res.sendStatus(404))

app.listen(config.port, config.hostname, () =>
  console.log(`Server is running on http://${config.hostname}:${config.port}`)
)
