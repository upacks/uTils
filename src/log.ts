import moment from 'moment'
import cl from 'cli-color'
import os from 'os'

const env = process.env || {}
const isProd = env.NODE_ENV === 'production'

const js = (level: string, message: string) => {

    try {

        return JSON.stringify({
            pid: process.pid ?? '-',
            host: os.hostname() ?? '-',
            time: moment().format('YYYY-MM-DD hh:mm:ss.SSS'),
            level,
            message,
        })

    } catch (err) {

        return `${level}: ${message} / ${err.message}`

    }

}

export const log = isProd ? {

    req: (message: string) => console.log(js('info', message)),
    res: (message: string) => console.log(js('info', message)),
    success: (message: string) => console.log(js('info', message)),
    info: (message: string) => console.log(js('info', message)),
    warn: (message: string) => console.warn(js('warn', message)),
    error: (message: string) => console.error(js('error', message)),

} : {

    req: (message: string) => console.log(cl.blue(` ⇠ ${message}`)),
    res: (message: string) => console.log(cl.blue(` ⇢ ${message}`)),
    success: (message: string) => console.log(cl.green(` ✩ ${message}`)),
    info: (message: string) => console.log(cl.blue(` ✔ ${message}`)),
    warn: (message: string) => console.log(cl.yellow(` ! ${message}`)),
    error: (message: string) => console.log(cl.red(` ✗ ${message}`)),

}