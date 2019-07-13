const users = {
  1: {
    id: "1",
    username: "mmontes11",
    messageIds: [2],
  },
  2: {
    id: "2",
    username: "foo",
    messageIds: [1],
  },
};

export const me = users[1];

export default users;
