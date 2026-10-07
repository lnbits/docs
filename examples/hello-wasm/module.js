export function greet(requestJson) {
  const input = JSON.parse(requestJson)
  const name = typeof input.name === 'string' ? input.name.trim() : ''
  if (name.length > 80) {
    return JSON.stringify({ok: false, error: 'Use a name of 80 characters or fewer.'})
  }
  return JSON.stringify({ok: true, message: `Hello, ${name || 'LNbits'}!`})
}
