// Element.js
{ // arbitrary scope to avoid global variables on client

  class Element {

    bindEventAttributes() {
      for (let attr in this.attributes) {
        if (/^on/i.test(attr) && typeof this.attributes[attr] === 'function') {
          // console.log({attr})
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
      // console.log({lastHandlerName})
      let handlerName = lastHandlerName ? Number(lastHandlerName.replace(/\_/ig,'')) : 0
      handlerName++
      this.__listeners__[handlerName] = eventName
      micro.__listeners__[handlerName] = handler
      // console.log({ "this.__listeners__[handlerName]": this.__listeners__[handlerName], eventName, handler })
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
        // console.log({domEventHandlers, events, event})
        domEventHandlerText += ` ${event}="${domEventHandlers.join(';')}"`
      }
      // console.log({domEventHandlerText})
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
      // console.log({result})

      // TODO this is a bad hack... need actual dom change event listener to call this
      if (this.ready) setTimeout(this.ready, 5)

      return result
    }

    toString() {
      return this.render()
    }

    onReady(fn) {
      this.ready = fn
      return this
    }
  }

  if (typeof micro !== 'undefined') micro.Element = Element
  else module.exports = Element
}
