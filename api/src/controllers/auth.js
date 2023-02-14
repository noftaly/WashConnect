export async function logIn(req, res) {
  res.json({ message: 'Endpoint /auth/login' })
}

export async function register(req, res) {
  res.json({ message: 'Endpoint /auth/register' })
}

export async function me(req, res) {
  res.json({ message: 'Endpoint /auth/me' })
}

export async function logOut(req, res) {
  res.json({ message: 'Endpoint /auth/logOut' })
}
