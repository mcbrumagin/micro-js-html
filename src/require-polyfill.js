
module = {
  set exports(fn) {
    if (!fn.name) throw new Error('Exports must be a named function/class')
    console.log({exports: fn})
    micro.modules[fn.name] = fn
  }
}

require = path => {
  let [, module] = path.match(/\/(.+)\.js$/i)
  console.log({module, modules: micro.modules})
  return micro[module] || micro.modules[module]
}
