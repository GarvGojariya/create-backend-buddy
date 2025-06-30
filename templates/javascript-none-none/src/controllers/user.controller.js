export function getUsers(_req, res) {
  res.json([{ id: 1, name: "Default User" }]);
}

export function createUser(req, res) {
  const user = req.body;
  user.id = Date.now();
  res.status(201).json(user);
}
