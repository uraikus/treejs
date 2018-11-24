class StateObject {
    constructor (state) {
        this.state = state || {}
        let watchParts = {}
        if (state) {
            let keys = Object.keys(state)
            for (let key of keys) {
                watchParts[key] = []
            }
        }
        this.setState = this.setState.bind(this)
        this.bindState = this.bindState.bind(this)
        this.watchParts = watchParts
    }

    setState (obj) {
        for (let key in obj) {
            this.set(key, obj[key])
        }
    }

    set (id, value) {
        if (this.watchParts[id] === undefined) this.watchParts[id] = []
        this.state[id] = value
        for (let x = 0; x < this.watchParts[id].length; x++) {
            let obj = this.watchParts[id][x]
            console.log(obj)
            obj.object[obj.key] = value
        }
    }

    bindState (id, object, key) {
        this.watchParts[id].push({object, key})
        object[key] = this.state[id]
    }
}

export default StateObject
