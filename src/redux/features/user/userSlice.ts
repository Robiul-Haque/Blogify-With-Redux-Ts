import { createSlice } from "@reduxjs/toolkit";

type TUserState = {
    searchName: null | string;
    email: null | string;
}

const initialState: TUserState = {
    searchName: null,
    email: null,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setName: (state, action) => {
            const { searchName } = action.payload;
            state.searchName = searchName;
        },
        forgotPasswordEmail: (state, action) => {
            const { email } = action.payload;
            state.email = email;
        }
    }
})

export const { setName, forgotPasswordEmail } = userSlice.actions;

export default userSlice.reducer;