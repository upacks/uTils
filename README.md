## Usage/Examples

```javascript
import { Start, isNode, isProd, log } from 'uTils'

Start({ 

    onSuccess: (config) => {
        log.info(isNode ? `NodeJS Environment` : `I guess it's Browser :)`)
        log.info(isProd ? `Production Environment` : `I guess it's Development:)`)
    }, 

    onError: (message) => {
        log.error(message)
        message.indexOf('fatal') >= 0 ? process.exit() : ":|"
    },

})
```