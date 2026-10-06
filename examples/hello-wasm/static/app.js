const button = document.querySelector('#greet')
const result = document.querySelector('#result')
button.addEventListener('click', async () => {
  button.disabled = true
  try {
    const response = await extensionClient.request('/greet', {
      method: 'POST', body: {name: document.querySelector('#name').value}
    })
    result.textContent = response.ok ? response.message : response.error
  } catch (error) {
    result.textContent = error.message
  } finally {
    button.disabled = false
  }
})
