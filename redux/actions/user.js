import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
} from '../types/userTypes';
import userData from '../data/userData';

const fetchUsersStart = () => ({
  type: FETCH_USERS_REQUEST,
});

const fetchUsersSuccess = users => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

const fetchUsersError = error => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

const fetchAndSortUsers = (name = '') => {
  const usersArray = Object.values(userData);

  usersArray.sort((a, b) => b.bananas - a.bananas);

  let topUsers = getTopUsers(usersArray);

  if (name) {
    topUsers = markAndUpdateUser(topUsers, usersArray, name);
  }

  sortUsersByRank(topUsers);

  return topUsers;
};

const getTopUsers = usersArray => {
  return usersArray.slice(0, 10).map((user, index) => ({
    name: user.name,
    rank: index + 1,
    bananas: user.bananas,
    mark: false,
  }));
};

const markAndUpdateUser = (topUsers, usersArray, name) => {
  const userIndex = usersArray.findIndex(
    user => user.name.toLowerCase() === name.toLowerCase(),
  );

  if (userIndex !== -1) {
    const foundUser = usersArray[userIndex];
    const userRank = usersArray.indexOf(foundUser) + 1;

    if (userRank <= 10) {
      topUsers[userRank - 1].mark = true;
    } else {
      const lastUserIndex = topUsers.length - 1;
      topUsers[lastUserIndex] = {
        name: foundUser.name,
        rank: userRank,
        bananas: foundUser.bananas,
        mark: true,
      };
    }
  } else {
    topUsers = [];
  }

  return topUsers;
};

const sortUsersByRank = users => {
  users.sort((a, b) => a.rank - b.rank);
};

export const fetchUsers = () => async dispatch => {
  dispatch(fetchUsersStart());

  try {
    setTimeout(() => {
      const top10Users = fetchAndSortUsers();
      dispatch(fetchUsersSuccess(top10Users));
    }, 2000);
  } catch (error) {
    dispatch(fetchUsersError(error));
  }
};

export const fetchUsersWithName = name => async dispatch => {
  dispatch(fetchUsersStart());

  try {
    setTimeout(() => {
      const top10Users = fetchAndSortUsers(name);
      dispatch(fetchUsersSuccess(top10Users));
    }, 2000);
  } catch (error) {
    dispatch(fetchUsersError(error));
  }
};
