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

const blog = (type, txt) => {

    console[type](txt)
    return true

}

export const log = isProd ? {

    req: (message: string) => blog('log', js('info', message)),
    res: (message: string) => blog('log', js('info', message)),
    success: (message: string) => blog('log', js('info', message)),
    info: (message: string) => blog('log', js('info', message)),
    warn: (message: string) => blog('warn', js('warn', message)),
    error: (message: string) => blog('error', js('error', message)),

} : {

    req: (message: string) => blog('log', cl.blue(` ⇠ ${message}`)),
    res: (message: string) => blog('log', cl.blue(` ⇢ ${message}`)),
    success: (message: string) => blog('log', cl.green(` ✩ ${message}`)),
    info: (message: string) => blog('log', cl.blue(` ✔ ${message}`)),
    warn: (message: string) => blog('log', cl.yellow(` ! ${message}`)),
    error: (message: string) => blog('log', cl.red(` ✗ ${message}`)),

}

/** To solve the log spam **/

export class Log {

    kv = {}
    alias
    delay

    constructor(alias: string = 'Default', delay: number = 2500) {

        this.alias = alias
        this.delay = delay

    }

    can = (type: string) => {

        if (this.kv.hasOwnProperty(type) /** O(1) **/) {

            if ((Date.now() - this.kv[type]) > this.delay) {

                this.kv[type] = Date.now()
                return true

            } else {
                return false
            }

        } else {

            this.kv[type] = Date.now()
            return true

        }

    }

    success = (type: string, message: string) => this.can(type) && console.log(cl.green(` ✩ ${message}`))

    info = (type: string, message: string) => this.can(type) && console.log(cl.blue(` ✔ ${message}`))

    warn = (type: string, message: string) => this.can(type) && console.log(cl.yellow(` ! ${message}`))

    req = (type: string, message: string) => this.can(type) && console.log(cl.blue(` ⇠ ${message}`))

    res = (type: string, message: string) => this.can(type) && console.log(cl.blue(` ⇢ ${message}`))

    error = (type: string, message: string) => this.can(type) && console.log(cl.red(` ✗ ${message}`))

}