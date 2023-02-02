//inicialization
const mongoose = require('mongoose')
const friendSchema = require('./schema/friend')

const Friend = new mongoose.model('Friend', friendSchema)
mongoose.connect('mongodb://localhost:27017/econdos')

//crud functions
const create = async (name, email) => {
  const person = new Friend({ name, email })
  const friend = await Friend.find({ name })
  if (friend.length) {
    console.log('CREATE: Usuário já existente')
    return
  }
  await person.save()
}

const read = async (name) => {
  const regExp = new RegExp(name?.toLowerCase(), 'gi')
  const person = await Friend.find({ name: regExp })
  if (!person.length) console.log('READ: Registro não encontrado')
  return person
}

const update = async (name, updateObj) => {
  const response = await Friend.updateOne({ name }, updateObj)
  if (!response.matchedCount) return console.log('UPDATE: Registro não encontrado')
  if (!response.modifiedCount) return console.log('UPDATE: Registro não modificado')
}

const deleteFriend = ({ name, email }) => {
  const deleteByName = name
  const deleteByEmail = email
  if (deleteByName) return Friend.deleteOne({ name })
  if (deleteByEmail) return Friend.deleteOne({ email })
}

module.exports = {
  create,
  read,
  update,
  deleteFriend
}