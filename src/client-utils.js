
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
      let pathFragments = hash.replace(/^\//ig,'').split('/')
      // console.log({pathFragments})
      let pathIndex = 0
      let result
      do {
        let path = pathFragments[pathIndex]
        result = resolvePath(path, result || routeMap)
        pathIndex++
        // console.log({result, test1: !!result, test2: !(result instanceof Element) })
      } while (result && !(result instanceof Element))
      let target = await micro.waitForElement(renderLocation)
      // console.log({result})
      target.innerHTML = result.render()
    }

    window.addEventListener('hashchange', hashChangeHandler)
    hashChangeHandler({ newURL: window.location.href })
  }
}