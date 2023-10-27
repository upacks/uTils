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

    private kv = {}
    private alias
    private delay

    constructor(alias: string = '', delay: number = 2500) {

        this.alias = alias
        this.delay = delay

    }

    private can = (type: string) => {

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

    success = (message: string, group: string = '-'): boolean => {

        this.can(group) && console.log(cl.green(` ✩ [${this.alias}] ${message}`))
        return true

    }

    info = (message: string, group: string = '-'): boolean => {

        this.can(group) && console.log(` ✔ [${this.alias}] ${message}`)
        return true

    }

    req = (message: string, group: string = '-'): boolean => {

        this.can(group) && console.log(cl.blue(` ⇠ [${this.alias}] ${message}`))
        return true

    }

    res = (message: string, group: string = '-'): boolean => {

        this.can(group) && console.log(cl.blue(` ⇢ [${this.alias}] ${message}`))
        return true

    }

    warn = (message: string, group: string = '-'): boolean => {

        this.can(group) && console.log(cl.yellow(` ! [${this.alias}] ${message}`))
        return true

    }

    error = (message: string, group: string = '-'): boolean => {

        this.can(group) && console.log(cl.red(` ✗ [${this.alias}] ${message}`))
        return true

    }

}