import express from 'express'
import { prisma } from '../lib/prisma'

const app = express()
app.use(express.json())

/**
 * GET /users
 * Get all users
 */
app.get('/users', async (_, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

/**
 * GET /user/:email
 * Get a single user by email
 */
app.get('/user/:email', async (req, res) => {
  const { email } = req.params

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.json(user)
})

/**
 * GET /user
 * Get users by name
 */
app.get('/user', async (req, res) => {
  const { name } = req.query

  if (!name) {

    res.json({message: "User Not Found!"})

  } else {

    const users = await prisma.user.findMany({
        where: {name: String(name)}
    })

    res.json(users)
  }
})

/**
 * POST /user
 * Create a new user
 */
app.post('/user', async (req, res) => {
  const { name, email, age, isMarried, nationality } = req.body

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      age,
      isMarried,
      nationality
    }
  })

  res.status(201).json(newUser)
})

/**
 * PUT /user/:email
 * Update a user by email
 */
app.put('/user/:email', async (req, res) => {
  const { email } = req.params
  const { name, age, isMarried, nationality } = req.body

  const updatedUser = await prisma.user.update({
    where: { email },
    data: {
      name,
      age,
      isMarried,
      nationality
    }
  })

  res.json(updatedUser)
})

/**
 * PATCH /user/:email
 * Partially update a user
 */
app.patch('/user/:email', async (req, res) => {
  const { email } = req.params

  const updatedUser = await prisma.user.update({
    where: { email },
    data: req.body
  })

  res.json(updatedUser)
})

/**
 * DELETE /user/:email
 * Delete one user by email
 */
app.delete('/user/:email', async (req, res) => {
  const { email } = req.params

  const deletedUser = await prisma.user.delete({
    where: { email }
  })

  res.json(deletedUser)
})

/**
 * DELETE /users/age/:age
 * Delete all users of a specific age
 */
app.delete('/users/age/:age', async (req, res) => {
  const age = Number(req.params.age)

  const result = await prisma.user.deleteMany({
    where: { age }
  })

  res.json(result)
})

/**
 * GET /users/count
 * Get total user count
 */
app.get('/users/count', async (_, res) => {
  const count = await prisma.user.count()
  res.json({ count })
})

/**
 * GET /users/married
 * Get all married users
 */
app.get('/users/married', async (_, res) => {
  const users = await prisma.user.findMany({
    where: { isMarried: true }
  })

  res.json(users)
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})