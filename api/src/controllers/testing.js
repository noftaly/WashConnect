export function find(req, res) {
  console.log(req.user);
  res.json({ message: "Welcome to WashConnect! There's nothing here..." });
}
