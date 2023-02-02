const form = document.querySelector('form')
const path = 'http://localhost:4000/friends/edit'

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const name = document.querySelector('#inputName4').value
  const email = document.querySelector('#inputEmail4').value
  if (!name || !email) return alert('Preencha todos os campos')
  const { data } = await axios.post(path, { name, email }).catch(err => console.log(err))
  alert(data.msg)
})