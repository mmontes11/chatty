export const createBatch = Entity => async keys => {
  const result = await Entity.find({
    _id: {
      $in: keys,
    },
  });
  return keys.map(key => result.find(el => key.equals(el.id)));
};
