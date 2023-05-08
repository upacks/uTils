import { Delay, Loop } from './utils'

/** Collect and Calls back when size reaches **/
export class Stress {
    queSize
    queue = []
    size = 0
    callback
    constructor(queueSize = 5) {
        this.queSize = queueSize
    }
    add = (item) => {
        this.queue.push(item)
        if (++this.size === this.queSize) {
            this.callback(this.queue)
            this.size = 0
            this.queue = []
        }
    }
    on = (cb) => this.callback = cb
}

/** Collects data and sends to callback one by one / this can overflow when callback fails continuously */
export class Queue {
    size = 0
    isFree = true
    queue = []
    add = (item: any) => {
        ++this.size
        this.queue.push(item)
        if (this.queue.length > 999) { return 'This is dangerous!' }
    }
    call = (cb, ms) => Loop(async () => {
        if (this.queue.length > 0 && this.isFree) {
            try {
                this.isFree = false
                const sent = await cb(this.queue[0])
                sent === true && this.queue.shift()
                Delay(() => { this.isFree = true }, ms)
            } catch (error) { Delay(() => { this.isFree = true }, ms) }
        }
    }, 100)
}

/** Collects data corresponding to time / calls back when size reaches or dispose due to timeout */
export class Collect {

    size
    store = {}
    callback
    dispose

    constructor(size = 4, timeout = 2500) {
        this.size = size
        Loop(() => {
            Object.keys(this.store).forEach(time => {
                if ((Date.now() - this.store[time]._sign) > timeout) {
                    this.dispose(this.store[time])
                    delete this.store[time]
                }
            })
        }, timeout)
    }

    on = (cb, dispose) => {
        this.callback = cb
        this.dispose = dispose
    }

    add = (time, key, value) => {
        if (!this.store[time]) {
            this.store[time] = {
                _size: 0,
                _sign: Date.now(),
            }
        }
        this.store[time][key] = value
        if (++this.store[time]._size === this.size) {
            this.callback(this.store[time])
            delete this.store[time]
        }
    }

}

/** Triggers a call after N seconds **/
export class Since {

    last = 0
    cb: any = null

    constructor(timeout = 5000) {
        Loop(() => {
            if (this.last !== 0 && Date.now() - this.last > timeout && this.cb) {
                this.last = 0
                this.cb()
            }
        }, 250)
    }

    add = () => { this.last = this.last === 0 ? Date.now() : this.last }

    call = (cb) => { this.cb = cb }

}