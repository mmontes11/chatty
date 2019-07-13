import { users } from "../constants/users"

const resolver = {
  Query: {
    me: (parent, args, { me }) => me,
    user: (parent, { id }) => users[id],
    users: () => Object.values(users),
  }
};

export default resolver;
