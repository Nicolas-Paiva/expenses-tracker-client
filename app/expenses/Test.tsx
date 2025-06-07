export default function Test() {
    return <div className="w-full md:w-2/3 mx-auto mb-6">
        <h3 className="text-center">Create a new expense</h3>
        <div
            className="flex justify-around md:justify-between w-full rounded border border-base-300 border-1 shadow-lg">
            <div className="flex flex-col justify-center">
                <p className="text-center">Value</p>
                <input type="text" placeholder="9.99" className="text-center"/>
            </div>
            <div className="hidden md:block flex flex-col justify-center">
                <p className="text-center">Value</p>
                <input type="text" placeholder="9.99" className="text-center"/>
            </div>
            <div className="flex flex-col justify-center">
                <p className="text-center">Created at</p>
                <input type="date" className="text-gray-400"/>
            </div>
        </div>
        <div className="flex justify-between mt-3">
            <button className="btn btn-sm btn-primary">Add expense</button>
            <button className="btn btn-sm btn-error">Clear expense</button>
        </div>
    </div>;
};