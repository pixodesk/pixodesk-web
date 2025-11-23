import { useState } from "react";

export default function Counter() {
    const [count, setCount] = useState(0);
    return (
        <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => setCount(count + 1)}
        >
            Count: {count}
        </button>
    );
}