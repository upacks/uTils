/**
 * Traversing recursively and find value
 * @param default_value 
 * @param type 
 * @returns (object, field_1, field_2, ...) => value
 */
export const oget = (default_value: any, type: string = "") => {

    const orec = (...gs: any) => {

        try {

            const obj = gs[0]
            const key = gs[1]

            if (key === undefined) {

                if (type === '') return obj
                if (type === 'string') return String(obj)
                if (type === 'number') return Number(obj)

            }

            if (obj.hasOwnProperty(key)) {

                gs.shift()
                gs[0] = obj[key]
                return orec(...gs)

            } else { return default_value }

        } catch { return default_value }

    }

    return orec

}