import { v4 as uuidv4 } from 'uuid'
import cl from 'cli-color'
import os from 'os'
import lodashi from "lodash"
import momenti from 'moment'

export const isNode: boolean = typeof process === 'object'
export const env: NodeJS.ProcessEnv = isNode ? process.env || {} : {}
export const isProd: boolean = env.NODE_ENV === 'production'
export const isDev: boolean = env.NODE_ENV === 'development'
export const dateFormat: string = "YYYY-MM-DD HH:mm:ss.SSS"
export const lodash: lodashi.LoDashStatic = lodashi
export const moment = momenti

export const Jfy = (e: any): {} => typeof e === 'string' ? JSON.parse(e) : e
export const Sfy = (e: any): string => typeof e === 'string' ? e : JSON.stringify(e)
export const Now = (): string => moment().format(dateFormat)
export const Sec = (hrtime: [number, number]): string => (hrtime[0] + (hrtime[1] / 1e9)).toFixed(3)
export const Uid = (): string => uuidv4()
export const Rnd = (): number => Math.ceil(Math.random() * 10)
export const Lag = (ms: number): Promise<number> => new Promise((res) => Delay(() => res(ms), ms))

export const Exec = setImmediate
export const Loop = setInterval
export const Delay = setTimeout