import messages from "../constants/messages";
import users from "../constants/users";

export default {
  Query: {
    messages: () => Object.values(messages),
    message: (parent, { id }) => messages[id],
  },
  Message: {
    user: ({ userId }) => users[userId],
  },
};
