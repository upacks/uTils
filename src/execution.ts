import blocked from 'blocked'
import { isNode, Exec } from './utils'
import { log } from './log'

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

export const Run = ({ onStart, onError, onExit }: any): void => {

    const alias = `PID_${process.pid}`
    const store: any = {}
    let isExitCalled = false

    try {

        /** 1. Event loop health **/
        blocked((ms: number) => { onError(store, `Event-Loop is blocked for ${ms}.ms`) }, { threshold: 99, interval: 100 })


        /** 2. Exit handler **/
        process.stdin.resume()

        const exitHandler = (options, exitCode) => {

            if (!isExitCalled) { console.log(''); isExitCalled = true; }
            if (options.cleanup && typeof onExit !== 'undefined') { log.warn(`${alias}: Cleaning up before process exits`) && onExit(store, exitCode) }
            if (exitCode) { log.warn(`${alias}: About to exit with "${exitCode}"`) }
            if (exitCode === 0) { log.warn(`${alias}: Bye"\n`) }
            if (options.exit) { process.exit(0) }

        }

        process.on('uncaughtException', (err: Error) => onError(store, `${alias}: Uncaught Exception / ${err.message}`))
        process.on('unhandledRejection', (err: Error) => onError(store, `${alias}: Unhandled Rejection / ${err.message}`))
        process.on('SIGTERM', exitHandler.bind(null, { exit: true }))
        process.on('SIGINT', exitHandler.bind(null, { exit: true }))
        process.on('SIGUSR1', exitHandler.bind(null, { exit: true }))
        process.on('SIGUSR2', exitHandler.bind(null, { exit: true }))
        process.on('exit', exitHandler.bind(null, { cleanup: true }))

        /** 3. Execute onStart **/
        onStart(store)


    } catch (err) {

        onError(store, `${alias}: ${err.message}`)

    }

}

/** Process health management */
export const Start = ({ onStart, onError, onExit }: any): void => {

    if (!isNode) return null

    const store: any = {}

    try {

        /** Check event loop health **/
        blocked((ms: number) => { if (ms > 99) { onError(store, `Event-Loop is blocked for ${ms}.ms`) } }, { threshold: 10, interval: 100 })

        //so the program will not close instantly
        process.stdin.resume()

        const exitHandler = (options, exitCode) => {

            if (options.cleanup && typeof onExit !== 'undefined') {
                log.warn(`Process [${process.pid}]: Cleaning up before process exits`)
                onExit(store, exitCode ?? 0)
                    .then(() => { process.exit(exitCode ?? 0) })
                    .catch((err) => { log.error(`Process [${process.pid}]: While exiting / ${err.message}`) })
            }
            if (exitCode || exitCode === 0) { log.warn(`Process [${process.pid}]: About to exit with "${exitCode}"`) }
            if (options.exit) { process.exit(0) }

        }

        /** Fatal error handler **/
        process.on('uncaughtException', (err: Error) => onError(store, `Uncaught Exception: ${err.message}`))
        process.on('unhandledRejection', (err: Error) => onError(store, `Unhandled Rejection: ${err.message}`))

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

        onError(store, `While starting the process: ${err.message}`)

    }

}