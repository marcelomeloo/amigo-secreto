const path = 'http://localhost:4000/friends'
emailjs.init('0wgWhRghsrpkHRALg')

const button = document.querySelector('#sort-button')
button.addEventListener('click', async () => {
  const sorted = await sortFriends()
  sorted.forEach(([receiver, friend]) => sendEmail(receiver, friend))
})

const sortFriends = async () => {
  const { data } = await axios.get(path)
  const allNames = data.map(friend => friend.name)
  const sortedFriends = data.map(friend => {
    const name = allNames.splice(getRandomFriend(allNames, friend), 1)[0]
    return [friend, name]
  })
  return sortedFriends
}

const getRandomFriend = (names, friend) => {
  if (names.length === 1) return 0
  const random = Math.floor(Math.random() * 100)
  const index = random % names.length
  if (friend.name === names[index]) return getRandomFriend(names, friend)
  return index
}

const sendEmail = (receiver, friend) => {
  emailjs.send('service_g4ptwze', 'template_na96vwi', assembleBody(receiver, friend))
  .then(e => console.log(e, { receiver }, friend))
  .catch(e => console.log(e))
}

const assembleBody = ({ name, email }, friend) => ({
  to_name: name,
  to_email: email,
  friend
})
