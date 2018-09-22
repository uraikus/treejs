const State = {}

function bindState (stateKey) {
  if (State[stateKey] === undefined) {
    newState(stateKey)
    State[stateKey].nodes.push(this)
  } else if (Array.isArray(State[stateKey].nodes) === false) {
    return false
  } else {
    State[stateKey].nodes.push(this)
    this.textContent = State[stateKey].value
    return true
  }
}

function newState (stateKey, stateValue) {
  State[stateKey] = {
    nodes: [],
    value: stateValue || '',
    get () {
      return this.value
    },
    set (newValue) {
      this.value = newValue
      this.nodes.forEach(node => {
        if (node.nodeType === 3) node.textContent = newValue
        else if (node.tagName === 'input') node.value = newValue
        else if (node.innerHTML !== undefined) node.innerHTML = newValue
        else node.innerText = newValue
      })
    }
  }
  return true
}

function setState (stateKey, stateValue) {
  if (State[stateKey] === undefined) newState(stateKey, stateValue)
  else State[stateKey].set(stateValue)
}

function getState (stateKey) {
  return State[stateKey].value
}

export { setState, getState, bindState }
