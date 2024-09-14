import express from 'express'
import path from 'path'
import compression from 'compression'
import cors from 'cors'
import bodyParser from 'body-parser'
import { port } from './configs/env_configs.js'
import { NOT_FOUND } from './constants/status_codes.js'
import ErrorHandlerMiddleware from './middlewares/error_handler.js'
import { fileURLToPath } from 'url'
import logger from './utils/logger.js'
import ValidateApiToken from './middlewares/validate_api_token.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
    cors()
)

app.use(compression())
app.use('/storage',express.static(path.join(__dirname, './storage')))

import ManagerRoute from './routes/manager_route.js'
import ClientRoute from './routes/client_route.js'
import NoteRoute from './routes/note_route.js'
import FlourRoute from './routes/flour_route.js'
import PaymentRoute from './routes/payment_route.js'
import SaleRoute from './routes/sale_route.js'
import ExpenseRoute from './routes/expense_route.js'
import IncomeRoute from './routes/income_route.js'
import StorageInRoute from './routes/storage_in_route.js'
import StorageOutRoute from './routes/storage_out_route.js'
import BackupRoute from './routes/backup_route.js'
import StatisticsRoute from './routes/statistics_route.js'
import ReportRoute from './routes/report_route.js'

app.use(
    '/api',
    ManagerRoute
)

app.use(
    '/api',
    ClientRoute,
    NoteRoute,
    FlourRoute,
    PaymentRoute,
    SaleRoute,
    ExpenseRoute,
    IncomeRoute,
    StorageInRoute,
    StorageOutRoute,
    BackupRoute,
    StatisticsRoute,
    ReportRoute
)

app.use(ErrorHandlerMiddleware)

app.get('*', (req, res) => {
    return res.status(NOT_FOUND).json({
        error: '404 Not Found',
        url: req.url
    })
})

const main = async () => {
    try{
        app.listen(port, () => console.log(`[server] listening on ${port}`))
    }catch(err){
        logger.error(err.message)
    }
}

main()