import { createSlice } from "@reduxjs/toolkit";

type TUserState = {
    searchName: null | string;
}

const initialState: TUserState = {
    searchName: null,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setName: (state, action) => {
            const { searchName } = action.payload;

            state.searchName = searchName;
        },
    }
})

export const { setName } = userSlice.actions;

export default userSlice.reducer;