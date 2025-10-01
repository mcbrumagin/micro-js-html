export default class Element {

  bindEventAttributes() {
    for (let attr in this.attributes) {
      if (/^on/i.test(attr) && typeof this.attributes[attr] === 'function') {
        this.addEventListener(attr, this.attributes[attr])
        delete this.attributes[attr]
      }
    }
  }

  constructor(...args) {
    if (typeof args[0] === 'object' && !(args[0] instanceof Element)) {
      this.attributes = args[0]
      this.__listeners__ = {} // TODO set-map?
      this.bindEventAttributes()
      args = args.slice(1)
    }
    this.children = args
  }

  addEventListener(eventName, handler) {
    // TODO if !micro, this is server side and needs to be rendered as an additional script
    let lastHandlerName = Object.keys(micro.__listeners__).slice(-1)[0]
    let handlerName = lastHandlerName ? Number(lastHandlerName.replace(/\_/ig,'')) : 0
    handlerName++
    this.__listeners__[handlerName] = eventName
    micro.__listeners__[handlerName] = handler
  }

  renderListeners() {
    let events = {}

    for (let handlerName in this.__listeners__) {
      let eventName = this.__listeners__[handlerName]
      let domEventHandler = `micro.__listeners__[${handlerName}](event)`
      if (events[eventName]) events[eventName].push(domEventHandler)
      else events[eventName] = [domEventHandler]
    }

    let domEventHandlerText = ''
    for (let event in events) {
      let domEventHandlers = events[event]
      domEventHandlerText += ` ${event}="${domEventHandlers.join(';')}"`
    }
    return domEventHandlerText
  }

  renderAttributes() {
    let attributes = ''
    for (let attrName in this.attributes) {
      let attrVal = this.attributes[attrName]
      attributes += ` ${attrName}="${attrVal}"`
    }
    return attributes
  }

  render() {
    let result = `<${this.tag}${this.renderAttributes()}${this.renderListeners()}>${
      this.children.map(elem => elem && elem.toString() || '').join('')
    }${this.isVoid ? '' : `</${this.tag}>`}`

    // TODO this is a bad hack... need actual dom change event listener to call this
    if (this.ready) setTimeout(this.ready, 20)

    return result
  }

  fromString() {
    throw new Error('Unimplemented')
  }

  toString() {
    return this.render()
  }

  fromDomNode() {
    throw new Error('Unimplemented')
  }

  toDomNode() {
    let rawHtmlString = this.render()
    let newNodeDom = new DOMParser().parseFromString(rawHtmlString, 'text/html')
    return newNodeDom.querySelector(this.tag)
  }

  onReady(fn) {
    this.ready = fn
    return this
  }
}
