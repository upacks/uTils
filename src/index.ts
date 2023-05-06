import moment from 'moment'
import blocked from 'blocked'
import lodashi from "lodash"
import { v4 as uuidv4 } from 'uuid'

import { log as logi } from './log'

export const isNode = typeof process === 'object'
export const env = isNode ? process.env || {} : {}
export const isProd = env.NODE_ENV === 'production'
export const isDev = env.NODE_ENV === 'development'
export const dateFormat = "YYYY-MM-DD HH:mm:ss.SSS"
export const lodash = lodashi
export const log = logi

export const Jfy = (e: any) => typeof e === 'string' ? JSON.parse(e) : e
export const Sfy = (e: any) => typeof e === 'string' ? e : JSON.stringify(e)
export const Now = () => moment().format(dateFormat)
export const Sec = (hrtime: any) => (hrtime[0] + (hrtime[1] / 1e9)).toFixed(3)
export const Uid = (): string => uuidv4()
export const Rnd = () => Math.ceil(Math.random() * 10)
export const Lag = (ms) => new Promise((res) => Delay(() => res(ms), ms))

export const Exec = setImmediate
export const Loop = setInterval
export const Delay = setTimeout

try { const ___ = require('./log') } catch (err) { log.error(`Require doesn't support!`) }

/** Executes callback in safe-mode */
export const Safe = () => {

    return (cb) => {

        try {

            if (cb.constructor.name === "AsyncFunction") {

                cb().then(e => { }).catch(err => log.error(`Safe Mode: ${err.message}`))
                return false

            } else {

                cb()
                return true

            }

        } catch (err) {

            log.error(`Safe Mode: ${err.message}`)
            return false

        }
    }

}

/** Executes callback in safe-mode after Immediate call */
export const Late = () => {

    return (cb) => {

        Exec(() => {

            try {

                if (cb.constructor.name === "AsyncFunction") {

                    cb().then(e => { }).catch(err => log.error(`Safe Mode (Late): ${err.message}`))
                    return false

                } else {

                    cb()
                    return true

                }

            } catch (err) {

                log.error(`Safe Mode (Late): ${err.message}`)
                return false

            }

        })

    }

}

/** Process health management */
export const Start = ({ onSuccess, onError }) => {

    if (!isNode) return null

    const store: any = {}

    try {

        /** Check event loop health **/
        blocked((ms: number) => {

            log.warn(`Event-Loop is blocked for ${ms}.ms`)
            if (ms > 99) { onError(`Event loop is blocked!`) }

        }, { threshold: 10, interval: 100 })

        /** Fatal error handler **/
        process.on('uncaughtException', (err: Error) => onError(`Uncaught Exception: ${err.message}`))
        process.on('unhandledRejection', (err: Error) => onError(`Unhandled Rejection: ${err.message}`))

        /** Try start **/
        onSuccess(store)

    } catch (err) {

        onError(`While starting the process: ${err.message}`)

    }

}