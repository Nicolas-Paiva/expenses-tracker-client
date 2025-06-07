import Image from 'next/image';

export default function Hero() {
    return <section>
        <div className="hero bg-base-200 min-h-screen flex flex-col items-center gap-y-16">
            <div className="hero-content text-center mt-20">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Expense Mate</h1>
                    <p className="py-6 text-md">
                        Ever needed an application to manage your expenses? Expense Mate helps you
                        organize all your expenses. Track your expenses along the year, look for
                        specific expense categories to verify whether you are spending more than you should.
                    </p>
                    <a href="/signup" className="link link-accent">Get Started</a>
                </div>
            </div>
            <Image src={"/images/hero-img.svg"} alt="chart" width={450} height={300}/>
        </div>
    </section>;
};
