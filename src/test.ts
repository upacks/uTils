import { Start } from './execution'
import { log } from './log'

Start({
    onStart: (store) => log.success(`${process.pid} is started!`),
    onError: (message) => log.warn(`${process.pid} ${message}`),
    onExit: () => log.warn(`${process.pid} is stopped!`),
})