import { sendRequest } from '@/utils/api';
import { User } from '@prisma/client';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// First, create the thunk
export const fetchAccount = createAsyncThunk(
    'account/fetchAccount',
    async () => {
        const response = await sendRequest<IBackendRes<{ user: User }>>({
            method: "GET",
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/getAccount`,
        })
        return response.data;
    }
)

interface IState {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: {
        id: string
        name: string
        email: string
        role: string
        imageUrl: string | null
        phone: string | null
    }
}

const initialState: IState = {
    isAuthenticated: false,
    isLoading: true,
    user: {
        id: '',
        name: '',
        email: '',
        role: '',
        imageUrl: null,
        phone: null
    }
};


export const accountSlide = createSlice({
    name: 'account',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchAccount.pending, (state, action: any) => {
            if (action.payload) {
                state.isAuthenticated = false;
                state.isLoading = true;
            }
        })

        builder.addCase(fetchAccount.fulfilled, (state, action: any) => {
            if (action.payload) {
                state.isAuthenticated = true;
                state.isLoading = false;
                state.user.id = action?.payload?.user?.id;
                state.user.email = action.payload.user?.email;
                state.user.name = action.payload.user?.name;
                state.user.role = action?.payload?.user?.role;
                state.user.imageUrl = action?.payload?.user?.imageUrl;
                state.user.phone = action?.payload?.user?.phone;
            }
        })

        builder.addCase(fetchAccount.rejected, (state, action: any) => {
            if (action.payload) {
                state.isAuthenticated = false;
                state.isLoading = false;
            }
        })

    },

});

export const {
} = accountSlide.actions;

export default accountSlide.reducer;
