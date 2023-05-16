export async function findOne(req, res) {
  res.json({ message: 'Endpoint /users/:userId' })
}

export async function findAll(req, res) {
  res.json({ message: 'Endpoint /users' })
}
