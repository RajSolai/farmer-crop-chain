const initialState = { isLogged: false };

export const loginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "login":
      return (state = payload);

    default:
      return state;
  }
};
