// utils.js
{ // arbitrary scope to avoid global variables on client

  async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  if (typeof micro !== undefined) micro.library = sleep
  else module.exports = { sleep }
}