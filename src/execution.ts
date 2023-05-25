import blocked from 'blocked'
import { log, isNode, Exec } from './utils'

/** Executes callback in safe-mode */
export const Safe = (cb) => {

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

/** Executes callback in safe-mode after Immediate call */
export const Late = (cb) => {

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

/** Process health management */
export const Start = ({ onStart, onError, onExit }): void => {

    if (!isNode) return null

    const store: any = {}

    try {

        /** Check event loop health **/
        blocked((ms: number) => {

            log.warn(`Event-Loop is blocked for ${ms}.ms`)
            if (ms > 99) { onError(`Event loop is blocked!`) }

        }, { threshold: 10, interval: 100 })

        //so the program will not close instantly
        process.stdin.resume()

        const exitHandler = (options, exitCode) => {

            if (options.cleanup) onExit()
            if (exitCode || exitCode === 0) log.warn(`Process [${process.pid}]: Exit code is ${exitCode}`)
            if (options.exit) process.exit()

        }

        /** Fatal error handler **/
        process.on('uncaughtException', (err: Error) => onError(`Uncaught Exception: ${err.message}`))
        process.on('unhandledRejection', (err: Error) => onError(`Unhandled Rejection: ${err.message}`))

        // do something when app is closing
        process.on('exit', exitHandler.bind(null, { cleanup: true }))
        // catches ctrl+c event
        process.on('SIGINT', exitHandler.bind(null, { exit: true }))
        // catches "kill pid" (for example: nodemon restart)
        process.on('SIGUSR1', exitHandler.bind(null, { exit: true }))
        process.on('SIGUSR2', exitHandler.bind(null, { exit: true }))

        /** Try start **/
        onStart(store)

    } catch (err) {

        onError(`While starting the process: ${err.message}`)

    }

}