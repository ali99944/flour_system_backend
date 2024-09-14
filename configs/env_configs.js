import * as dotenv from 'dotenv'
import * as path from 'path'
import { fileURLToPath } from 'url'

import { readFileSync } from 'fs'
import Handlebars from 'handlebars'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({
    path: path.join(__dirname, '../.env')
})

export const jwt_secret_key = process.env.JWT_SECRET_KEY.trim()
export const port = process.env.PORT.trim()
export const host = process.env.HOST.trim()
export const base_url = process.env.BASE_URL.trim()
export const node_env = process.env.NODE_ENV.trim()
export const is_development = node_env == 'development'

export const smtp_host = process.env.SMTP_HOST
export const smtp_port = +process.env.SMTP_PORT
export const smtp_user = process.env.SMTP_USER
export const smtp_pass = process.env.SMTP_PASS

export const static_files_host = process.env.STATIC_FILES_HOST

export const report_template = readFileSync('templates/template.html', 'utf8')

export const compiled_report_template = Handlebars.compile(report_template)