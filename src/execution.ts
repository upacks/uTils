import blocked from 'blocked'
import { log, isNode, Exec } from './utils'

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
export const Start = ({ onSuccess, onError }): void => {

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