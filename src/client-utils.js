
// client-util.js TODO rename to libs? or scope to "micro.utils"
{ // arbitrary scope to avoid global variables

  micro.library = async function waitForElement(tag, interval = 10) {
    let element
    do {
      element = document.querySelector(tag)
      await micro.sleep(interval)
    } while (!element)
    return element
  }
  
  micro.library = function hashRouter(routeMap, renderLocation = 'body') {
    // TODO validate routeMap
    // TODO run router once on startup
    const { Element } = micro

    const getHash = url => url.split('#')[1]

    const resolvePath = (path, routeMap) => {
      // console.log({path, routeMap})
      for (let route in routeMap) {
        // console.log({route, path})
        if (route.replace(/\//ig, '') === path) {
          // console.log('MATCH')
          return routeMap[route]
        }
      }
    }

    const hashChangeHandler = async ({ oldURL: oldUrl, newURL: newUrl }) => {
      // console.log('location changed!', {oldUrl, newUrl})
      let hash = getHash(newUrl)
      // console.log({hash})
      if (!/\/$/ig.test(hash)) hash += '/'
      let pathFragments = hash.replace(/^\//ig,'').split('/')
      // console.log({pathFragments})
      let pathIndex = 0
      let result
      do {
        let path = pathFragments[pathIndex]
        result = resolvePath(path, result || routeMap)
        pathIndex++
        // console.log({result, test1: !!result, test2: !(result instanceof Element), test3: !(typeof result === 'function') })
      } while (result && !(result instanceof Element) && !(typeof result === 'function'))
      // console.log({result})
      if (typeof result === 'function') {
        // console.log('calling route fn')
        result = await result()
        // console.log('route ready')
      }
      result = result.render()

      let target = await micro.waitForElement(renderLocation)
      // console.log('result before insert', { target, result })
      target.innerHTML = result + ''
    }

    window.addEventListener('hashchange', hashChangeHandler)
    hashChangeHandler({ newURL: window.location.href })
  }
}