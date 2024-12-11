// Utility for managing "USER" data in localStorage
export const userLocalStorage = {
  get: () =>
    localStorage.getItem("USER")
      ? JSON.parse(localStorage.getItem("USER"))
      : null,

  set: (userDataContentInfo) => {
    localStorage.setItem("USER", JSON.stringify(userDataContentInfo));
  },

  remove: () => {
    localStorage.removeItem("USER");
  },
};

// Utility for managing "ADMIN" data in localStorage
export const adminLocalStorage = {
  get: () =>
    localStorage.getItem("ADMIN")
      ? JSON.parse(localStorage.getItem("ADMIN"))
      : null,

  set: (userDataContentInfo) => {
    localStorage.setItem("ADMIN", JSON.stringify(userDataContentInfo));
  },

  remove: () => {
    localStorage.removeItem("ADMIN");
  },
};
