const functions = require('./crudFunctions')

const sortFriends = async () => {
  const allFriends = await functions.read()
  const names = allFriends.map(friend => friend.name)
  const sortedFriends = allFriends.map(friend => {
    const name = names.splice(getRandomFriend(names, friend), 1)[0]
    return [friend, name]
  })
  console.log(sortedFriends)
}

const getRandomFriend = (names, friend) => {
  if (names.length === 1) return 0
  const random = Math.floor(Math.random() * 100)
  const index = random % names.length
  if (friend.name === names[index]) return getRandomFriend(names, friend)
  return index
}

const sendEmail = sorted => {

}

sortFriends().then(() => process.exit())