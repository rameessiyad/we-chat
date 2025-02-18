export const getSender = (loggedUser, users) => {
  console.log("LoggedIn User : ", loggedUser);
  console.log("Users : ", users);
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};
