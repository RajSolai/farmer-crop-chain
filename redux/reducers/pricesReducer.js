const initialState = { price: [] };

export const pricesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "save":
      return (state = payload);

    default:
      return state;
  }
};
