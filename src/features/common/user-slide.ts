import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDto } from '../users/types/user.type';

interface UserState {
    isAuthenticated: boolean;
    user: UserDto | null; 
    
}

const initialState: UserState = {
    user: null,
    isAuthenticated: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (
            state,
            action: PayloadAction<{ user: UserDto ; isAuthenticated : boolean }>
        ) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },

        logoutUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },

    },
});

export const { setUserDetails, logoutUser } = userSlice.actions;

export default userSlice.reducer;
