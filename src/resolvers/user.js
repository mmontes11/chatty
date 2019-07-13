import users from "../constants/users";
import messages from "../constants/messages";

export default {
  Query: {
    me: (parent, args, { me }) => me,
    user: (parent, { id }) => users[id],
    users: () => Object.values(users),
  },
  User: {
    messages: ({ id }) => Object.values(messages).filter(message => message.userId === id),
  },
};
