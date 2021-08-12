import express from 'express'
import config from './config/config'
import connect from './db/connect'
import rootRouter from './routes/root.routes'
import { applyMiddleware } from './middleware'
import { seedDB } from './db/seed'

const app = express()
applyMiddleware(app)

app.use('/api', rootRouter)
app.use((req: express.Request, res: express.Response) =>
  res.status(404).send({ message: 'route not found' })
)

connect
  .then(async () => {
    await seedDB()
    app.listen(config.port, config.hostname, () =>
      console.log(
        `Server is running on http://${config.hostname}:${config.port}`
      )
    )
  })
  .catch((error) => console.log(error))
