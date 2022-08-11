const coordinates = (state = [], action) => {
    console.log('coords, ', action.payload)
    switch (action.type) {
      case 'SET_COORDINATES':
          return [...state, action.payload];
      case 'UNSET_COORDINATES':
          return [];
      default:
        return state;
    }
};

export default coordinates;