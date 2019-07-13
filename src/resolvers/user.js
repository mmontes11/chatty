const users = {
  1: {
    id: "1",
    username: "Martín Montes",
  },
  2: {
    id: "2",
    username: "foo",
  },
};

const me = users[1];

const resolver = {
  Query: {
    me: () => me,
    user: (parent, { id }) => users[id],
    users: () => Object.values(users),
  },
};

export default resolver;
