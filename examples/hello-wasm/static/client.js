// The iframe uses a MessageChannel bridge; it cannot fetch directly.
;(function () {
  let connection
  let sequence = 0
  const listeners = new Map()

  function connect() {
    if (connection) return connection
    connection = new Promise((resolve, reject) => {
      if (window.parent === window) {
        reject(new Error('Open this page through LNbits.'))
        return
      }
      const id = `connect-${++sequence}`
      const channel = new MessageChannel()
      const timeout = setTimeout(() => {
        channel.port1.close()
        reject(new Error('LNbits bridge connection timed out. Reload the page.'))
      }, 30000)
      channel.port1.addEventListener('message', event => {
        const response = event.data
        if (response?.type === 'lnbits-extension:connected' && response.id === id) {
          clearTimeout(timeout)
          resolve(channel.port1)
        }
        if (response?.type === 'lnbits-extension:event') {
          listeners.get(response.subscriptionId)?.(response)
        }
      })
      channel.port1.start()
      window.parent.postMessage({type: 'lnbits-extension:connect', id},
        window.location.origin, [channel.port2])
    })
    return connection
  }

  async function bridge(message) {
    const port = await connect()
    const id = `request-${++sequence}`
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        port.removeEventListener('message', onMessage)
        reject(new Error('Extension request timed out.'))
      }, 30000)
      function onMessage(event) {
        const response = event.data
        if (response?.type !== 'lnbits-extension:response' || response.id !== id) return
        clearTimeout(timeout)
        port.removeEventListener('message', onMessage)
        if (response.ok) resolve(response.data)
        else reject(new Error(response.error || 'Extension request failed.'))
      }
      port.addEventListener('message', onMessage)
      port.postMessage({type: 'lnbits-extension:request', id, ...message})
    })
  }

  window.extensionClient = {
    bridge,
    request(path, {method = 'GET', body = null} = {}) {
      return bridge({action: 'api', method, path: `/api/v1/ext/hello_wasm${path}`, body})
    },
    async subscribeWebsocket(itemId, callback) {
      const subscriptionId = `subscription-${++sequence}`
      listeners.set(subscriptionId, callback)
      try {
        await bridge({action: 'websocket.subscribe', itemId, subscriptionId})
      } catch (error) {
        listeners.delete(subscriptionId)
        throw error
      }
      return async () => {
        listeners.delete(subscriptionId)
        await bridge({action: 'websocket.unsubscribe', subscriptionId})
      }
    }
  }
})()
