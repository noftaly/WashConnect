// Return the user but without the password
export function safeUser(user) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
