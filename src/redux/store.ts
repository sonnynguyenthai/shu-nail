import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/redux/slices/counter.slice"
export const store = configureStore({
    reducer: {
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;