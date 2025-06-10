// app/expenses/loading.tsx

type LoadingProps = {
    fullScreen: boolean
}

export default function Loading({fullScreen}: LoadingProps) {
    if (!fullScreen) {
        return <span className="block mx-auto loading loading-spinner text-primary w-12"></span>;
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <p className="text-lg font-medium">Loading expenses...</p>
            <span className="loading loading-bars loading-xl text-primary w-36"></span>
        </div>
    );
}
