import Image from 'next/image';

export default function Hero() {
    return <section>
        <div className="hero bg-base-200 min-h-screen flex flex-col items-center gap-y-16">
            <div className="hero-content text-center mt-20">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Expense Mate</h1>
                    <p className="py-6 text-md">
                        Expense Mate lets you easily create, update, and delete your expenses throughout the year.
                        Visualize your spending with clear, interactive charts that help you track your expenses over
                        time.
                    </p>
                    <a href="/signup" className="link link-accent">Get Started</a>
                </div>
            </div>
            <Image src={"/images/hero-img.svg"} alt="chart" width={450} height={300}/>
        </div>
    </section>;
};
