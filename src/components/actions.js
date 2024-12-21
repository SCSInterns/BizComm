export const ActionTypes = {
  LOGIN: 'LOGIN',
  SIGNUP: 'SIGNUP',
  FETCH_MORE_DATA: 'FETCH_MORE_DATA' // New action type for fetching more data
};

export const login = () => ({
  type: ActionTypes.LOGIN
});

export const signup = () => ({
  type: ActionTypes.SIGNUP
});

export const fetchMoreData = () => ({
  type: ActionTypes.FETCH_MORE_DATA
});
