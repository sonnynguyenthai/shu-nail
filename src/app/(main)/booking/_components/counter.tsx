"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCount, increment, decrement } from "@/redux/slices/counter.slice";

export default function Counter() {
    const dispatch = useAppDispatch();
    const { value, loading } = useAppSelector((state) => state.counter);

    return (
        <div className="p-4 border rounded-md">
            <h1 className="text-xl font-bold">Counter: {value}</h1>
            <div className="mt-2">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                    onClick={() => dispatch(increment())}
                >
                    +
                </button>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded"
                    onClick={() => dispatch(decrement())}
                >
                    -
                </button>
            </div>
            <button
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
                onClick={() => dispatch(fetchCount())}
                disabled={loading}
            >
                {loading ? "Loading..." : "Fetch Random Count"}
            </button>
        </div>
    );
}