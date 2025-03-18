import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import accountReducer from "@/redux/slices/account.slice"
import branchReducer from "@/redux/slices/branch.slice"
import serviceReducer from "@/redux/slices/services.slice"
export const store = configureStore({
    reducer: {
        account: accountReducer,
        branch: branchReducer,
        service: serviceReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;