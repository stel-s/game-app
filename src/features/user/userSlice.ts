import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const defaultBalance = 100;
const userName = window.localStorage.getItem('userName') || ''

interface UserState {
  name: string;
  balance: number;
}

const initialState: UserState = {
  balance: defaultBalance,
  name: userName,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    resetUserState: state => initialState
  },
});

export const { addUserName, resetUserState } = userSlice.actions;

export const selectUserName = (state: RootState) => state.user.name;
export const selectUserBalance = (state: RootState) => state.user.balance;


export default userSlice.reducer;