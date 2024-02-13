import { v4 as uuidv4 } from 'uuid'
// import lodashi from "lodash"
import momenti from 'moment'

export const isNode: boolean = typeof process === 'object'
/* export const env: NodeJS.ProcessEnv = isNode ? process.env || {} : {}
export const isProd: boolean = env.NODE_ENV === 'production'
export const isDev: boolean = env.NODE_ENV === 'development' */
export const dateFormat: string = "YYYY-MM-DD HH:mm:ss.SSS"
// export const lodash: lodashi.LoDashStatic = lodashi
export const moment = momenti

export const Loop = setInterval
export const Delay = setTimeout
export const Exec = (cb) => Delay(() => cb(), 0)
export const Uid = (): string => uuidv4()

export const Win: Window | any = typeof window === 'undefined' ? {} : window
export const Doc: Document | any = typeof document === 'undefined' ? {} : document

/**
 * @returns "YYYY-MM-DD HH:mm:ss.SSS"
 */
export const Now = (): string => moment().format(dateFormat)

/**
 * Parses String -> JSON
 * @param e 
 * @returns JSON
 */
export const Jfy = (e: any): {} => typeof e === 'string' ? JSON.parse(e) : e

/**
 * Parses JSON -> String
 * @param e 
 * @returns String
 */
export const Sfy = (e: any): string => typeof e === 'string' ? e : JSON.stringify(e)

/**
 * Generates random numbers between 0 -> 100
 * Could possibly be Int or Float
 * @returns Number
 */
export const Rnd = (): number => Math.ceil(Math.random() * 10)

/**
 * Useful for computing time complexity
 * Example: ???
 * @param hrtime
 * @returns 
 */
export const Sec = (hrtime: [number, number]): string => (hrtime[0] + (hrtime[1] / 1e9)).toFixed(3)

/**
 * Waits Asynchronously [ Doesn't block Event-Loop ]
 * @param ms 
 * @returns true<Boolean>
 */
export const AsyncWait = (ms: number): Promise<boolean> => new Promise((res) => Delay(() => res(true), ms))

/**
 * Waits Synchronously [ Blocks the Event-Loop ]
 * @param ms
 */
export const SyncWait = (ms: number) => {

    let start = Date.now(), now = start
    while (now - start < ms) { now = Date.now() }

}

/**
 * Sync LocalStorage 
 * @param key 
 * @param value 
 * @returns 
 */
export const KeyValue = (key: string, value: any = undefined): string => {

    try {

        if (key) {

            if (typeof value === "string") {

                localStorage.setItem(key, value)
                return localStorage.getItem(key)

            } else {

                return localStorage.getItem(key)

            }

        } else { return '' }

        /* if (key && value) {
            localStorage.setItem(key, value)
            return localStorage.getItem(key)
        }

        if (key && value === '') {
            return localStorage.getItem(key)
        } */

    } catch { return '' }

}

/**
 * JWT to JSON only works on browser
 * @param token
 * @returns 
 */
export const parseJwt = (token: string) => {

    try {

        var base64Url = token.split('.')[1]
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        }).join(''))

        return JSON.parse(jsonPayload) ?? null

    } catch (err) { return null }

}