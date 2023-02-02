//inicialization
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const crud = require('./crudFunctions')

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//routes
app.get('/friends', async (req, res) => {
  const friends = await crud.read()
  res.status(200)
  res.json(friends)
})

app.post('/friends/registration', async (req, res) => {
  const { name, email } = req.body
  const friend = await crud.read(name)
  if (friend.length) res.json({ msg: 'Usuário já existe' }) 
  else {
    await crud.create(name, email)
    res.json({ msg: 'Usuário criado com sucesso' })
  }
  res.status(200)
})

app.post('/friends/edit', async (req, res) => {
  const { name, email } = req.body
  const friend = await crud.read(name)
  if (!friend.length || friend[0].name !== name) {
    res.status(200)
    res.json({ msg: 'Usuário não existente' })
    return
  }
  if (friend[0].name === name && friend[0].email === email) {
    res.status(200)
    res.json({ msg: 'Usuário não foi modificado' })
    return
  }
  await crud.update(name, { email })
  res.status(200)
  res.json({ msg: 'Usuário modificado' })
})

app.delete('/friends/:name', async (req, res) => {
  const info = await crud.deleteFriend(req.params)
  if (!info.deletedCount) res.json({ msg: 'Nenhum usuário foi deletado' })
  else res.json({ msg: 'Usuário deletado com sucesso' })
  res.status(200)
})

app.listen(4000, () => console.log('Server started!'))
