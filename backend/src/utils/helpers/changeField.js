const getChangedFields = (existing, updateData, ignoreKeys = []) => {
  const changedFields = {};

  Object.keys(updateData).forEach((key) => {
    if (ignoreKeys.includes(key)) return;

    const oldVal = existing?.[key];
    const newVal = updateData?.[key];

    if (!isEqual(oldVal, newVal)) {
      changedFields[key] = { old: oldVal, new: newVal };
    }
  });

  return changedFields;
};