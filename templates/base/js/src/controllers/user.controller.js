export const getUsers = async (req, res) => {
  // Simulate fetching users from a database
  const users = [{ id: 1, name: "Default User" }];
  try {
    // Here you would typically fetch users from your database
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};
