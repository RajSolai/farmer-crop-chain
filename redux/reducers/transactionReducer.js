const initialState = {
  transactions: [],
};

export const transactionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "save":
      return (state = payload);

    default:
      return state;
  }
};
