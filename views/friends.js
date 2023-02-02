const path = 'http://localhost:4000/friends'

window.onload = async _ => {
  const getRes = await axios.get(path)
  getRes.data.map(friend => addRow(friend))
  const buttons = document.querySelectorAll('button')
  buttons.forEach(btn => {
    const [ name ] = btn.id.split('-')
    btn.addEventListener('click', async () => {
      const deleteRes = await axios.delete(`${path}/${name}`)
      alert(deleteRes.data.msg)
      location.reload()
    })
  })
}

const addRow = friend => {
  const tbody = document.querySelector('tbody')
  const tr = document.createElement('tr')
  const name = document.createElement('td')
  name.textContent = friend.name
  const email = document.createElement('td')
  email.textContent = friend.email
  const deleteCol = document.createElement('td')
  const button = document.createElement('button')
  button.textContent = 'Delete'
  button.className = 'btn btn-warning'
  button.id = `${friend.name}-delete`
  tr.appendChild(name)
  tr.appendChild(email)
  deleteCol.appendChild(button)
  tr.appendChild(deleteCol)
  tbody.appendChild(tr)
}