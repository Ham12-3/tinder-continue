const getMatchedUserInfo = (users, userLoggedIn) => {
  const newUsers = { ...user };
  delete newUsers[userloggedIn];

  const [id, user] = Object.entries(newUsers).flat();
};
