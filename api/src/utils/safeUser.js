// Return the user but without the password
export function safeUser(user) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

// Return the user but without the password, email, phone number, and balance
export function safeUnknownUser(user) {
  const { password, email, phoneNumber, balance, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
