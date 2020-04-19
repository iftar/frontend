let storage = window.localStorage

export const saveItem = (name, data) => {
  storage.setItem(name, data)
};

export const getItem = (name) => {
  return storage.getItem(name)
};

export const removeItem = (name) => {
  storage.removeItem(name)
};

