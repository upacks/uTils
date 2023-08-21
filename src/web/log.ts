
const blog = (type, txt) => {

    console[type](txt)
    return true

}

export const log = {

    req: (message: string) => blog('log', ` ⇠ ${message}`),
    res: (message: string) => blog('log', ` ⇢ ${message}`),
    success: (message: string) => blog('log', ` ✩ ${message}`),
    info: (message: string) => blog('info', ` ✔ ${message}`),
    warn: (message: string) => blog('warn', ` ! ${message}`),
    error: (message: string) => blog('error', ` ✗ ${message}`),

}