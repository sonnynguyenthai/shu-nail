import { Branch } from '@prisma/client';
import { createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs';



interface IState {
    isLoading: boolean;
    selectedBranch: Branch | null;
}

const initialState: IState = {
    isLoading: false,
    selectedBranch: null,
};

export const branchSlice = createSlice({
    name: 'branch',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setBranchBooking: (state, action) => {
            if (action.payload) {
                state.selectedBranch = action.payload;
            }
        },
    }
});
export const {
    setBranchBooking
} = branchSlice.actions;
export default branchSlice.reducer;