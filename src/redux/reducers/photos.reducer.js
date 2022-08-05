const photoList = (state = [], action) => {
    switch (action.type) {
      case 'SET_PHOTOS':
          return [...state, 
          action.payload
          ];
      default:
        return state;
    }
};
  

export default photoList;