import { serverHttp } from "./index"
import './websocket'
const PORT = process.env.PORT || 3833

serverHttp.listen(PORT, () => {
  console.log(`server listening at http://localhost:${PORT}`)
})