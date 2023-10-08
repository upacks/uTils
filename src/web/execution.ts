import { Exec } from './utils'
import { log } from './log'

/** Executes callback in safe-mode */
export const Safe = (cb, alias: string = '[*]') => {

    try {

        if (cb.constructor.name === "AsyncFunction") {

            cb().then(e => { }).catch(err => log.error(`Safe Mode ${alias}: ${err.message}`))
            return false

        } else {

            cb()
            return true

        }

    } catch (err) {

        log.error(`Safe Mode ${alias}: ${err.message}`)
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