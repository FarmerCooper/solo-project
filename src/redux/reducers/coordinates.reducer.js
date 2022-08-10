const coordinates = (state = [], action) => {
    switch (action.type) {
      case 'SET_COORDINATES':
          return [...state, action.payload];
      default:
        return state;
    }
};

export default coordinates;