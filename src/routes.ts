import { Request, Response, Router } from 'express'
const routes = Router()

routes.get('/', async (req:Request, res:Response) => {
  
  res.render('index.html')
})

export {routes}