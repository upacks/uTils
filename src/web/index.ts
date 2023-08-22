export * from './log'

export const help = () => {

    import('./log').then(({ log }) => {

        log.success(`log.success('***')`)
        log.info(`log.info('***')`)
        log.warn(`log.warn('***')`)
        log.error(`log.error('***')`)

        log.req(`log.req('***')`)
        log.res(`log.res('***')`)

    })

}

if (typeof process !== 'undefined' && process.argv.includes('--debug')) {

    help()

}