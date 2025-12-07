const user = await User.create({
  name,
  email,
  passwordHash: hash,
  role: "admin", // DIKUNCI
});
