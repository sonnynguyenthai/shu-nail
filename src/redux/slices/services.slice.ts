import { sendRequest } from '@/utils/api';
import { Service, User } from '@prisma/client';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// First, create the thunk
export const fetchServices = createAsyncThunk(
    'service/fetchAccount',
    async (branchId: string) => {
        const response = await sendRequest<IBackendRes<User[]>>({
            method: "GET",
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services/get-by-branch`,
            queryParams: { branchId }
        })
        return response.data;
    }
)

interface IState {
    isLoading: boolean;
    services: Service[] | null
}

const initialState: IState = {
    isLoading: true,
    services: null
};


export const accountSlide = createSlice({
    name: 'service',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchServices.pending, (state, action: any) => {
            if (action.payload) {
                state.isLoading = true;
            }
        })

        builder.addCase(fetchServices.fulfilled, (state, action: any) => {
            if (action.payload) {
                state.isLoading = false;
                state.services = action.payload.services
            }
        })

        builder.addCase(fetchServices.rejected, (state, action: any) => {
            if (action.payload) {
                state.isLoading = false;
            }
        })

    },

});

export const {
} = accountSlide.actions;

export default accountSlide.reducer;
