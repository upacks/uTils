export * from './collectors'
export * from './execution'
export * from './object'
export * from './utils'
export * from './shell'
export * from './log'

/* setTimeout(() => {

    const { ulog, ushort } = require('./log')
    const key = `TRX_${ushort()}`
    ulog(key, 'req', 'Pulling data')
    setTimeout(() => { ulog(key, 'info', 'Preparing for response') }, 1500)
    setTimeout(() => { ulog(key, 'res', 'Data from server') }, 1700)
    setTimeout(() => { ulog(key, 'catch', 'Succeeded') }, 2500)
    setTimeout(() => { ulog(key, 'then', 'Succeeded') }, 2500)

}, 500) */