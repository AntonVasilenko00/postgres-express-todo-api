import bodyParser from 'body-parser'

export const parser = bodyParser.urlencoded({ extended: false })
export const jsonParser = bodyParser.json()
