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

/** Extra ungly logging **/

const keys: any = {}
const icon = {
    'cloud': '🌍',
    'vehicle': '🚂',
    'user': '👩‍💻',
    'db': '💾',
}
type tUlog = 'req' | 'res' | 'info' | 'then' | 'catch'
type tDirection = 'cloud' | 'vehicle' | 'user' | 'db'
setInterval(() => { for (const key in keys) if (typeof keys[key] === 'object' && (Date.now() - keys[key].start) > 30000) delete keys[key] }, 1000)
export const ushort = () => `${Date.now()}`.substring(7, 13)
export const ulog = (key: string, type: tUlog, message: string, from: tDirection = 'vehicle', to: tDirection = 'cloud') => {

    let time = '0.00s', _fr = icon[from], _to = icon[to]

    if (typeof keys[key] === 'undefined') keys[key] = { start: Date.now(), logs: [] }
    if (typeof keys[key] === 'object') time = `${((Date.now() - keys[key].start) / 1000).toFixed(2)}s`

    type === 'req' && keys[key].logs.push(cl.cyanBright(`${_fr} 🡆 ${_to} ${time} | ${key} ${message}`))
    type === 'res' && keys[key].logs.push(cl.cyanBright(`${_fr} 🡆 ${_to} ${time} | ${key} ${message}`))
    type === 'info' && keys[key].logs.push(cl.white(`${_fr} ⯐ ${_to} ${time} | ${key} ${message}`))
    type === 'then' && keys[key].logs.push(cl.green(`${_fr} 🢡 ${_to} ${time} | ${key} ${message}`))
    type === 'catch' && keys[key].logs.push(cl.red(`${_fr} 🢡 ${_to} ${time} | ${key} ${message}`))

    const duration = [Date.now() - keys[key].start]

    if (type === 'then' || type === 'catch') {
        console.log()
        for (const chlk of keys[key].logs) console.log(chlk)
        delete keys[key]
    }

    return { key, duration }

}