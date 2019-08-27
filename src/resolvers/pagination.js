export default {
  Pageable: {
    __resolveType({ text, createdBy, name }) {
      if (text && createdBy) {
        return "Message";
      }
      if (name) {
        return "Topic";
      }
      return null;
    },
  },
};
