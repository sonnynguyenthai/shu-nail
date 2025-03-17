import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Simulate an async API call
export const fetchCount = createAsyncThunk("counter/fetchCount", async () => {
    const response = await new Promise<{ data: number }>((resolve) =>
        setTimeout(() => resolve({ data: Math.floor(Math.random() * 100) }), 1000)
    );
    return response.data;
});

interface CounterState {
    value: number;
    loading: boolean;
}

const initialState: CounterState = {
    value: 0,
    loading: false,
};

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCount.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCount.fulfilled, (state, action) => {
                state.loading = false;
                state.value = action.payload;
            })
            .addCase(fetchCount.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;