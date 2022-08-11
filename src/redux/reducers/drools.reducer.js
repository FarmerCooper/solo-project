const droolList = (state = [], action) => {
    switch (action.type) {
      case 'SET_DROOLS':
          return action.payload;
      default:
        return state;
    }
};

export default droolList;