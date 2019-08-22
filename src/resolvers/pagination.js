export default {
  Pageable: {
    __resolveType({ text, createdBy }) {
      if (text && createdBy) {
        return "Message";
      }
      return null;
    },
  },
};
