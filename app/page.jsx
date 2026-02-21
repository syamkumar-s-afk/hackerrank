import Link from 'next/link';

export default function Home() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-hr-bg-light dark:bg-hr-bg-dark transition-colors">
            <div className="p-10 rounded-lg shadow-xl bg-white dark:bg-hr-panel-dark border border-gray-200 dark:border-hr-border-dark flex flex-col items-center max-w-md w-full text-center">
                <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Coding Assessment</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Welcome to the HackerRank-style coding environment clone. Click below to begin the dummy assessment.
                </p>
                <Link
                    href="/test"
                    className="bg-[#00ea64] hover:bg-[#00cb55] text-black font-semibold py-3 px-8 rounded transition-colors"
                >
                    Start Test
                </Link>
            </div>
        </main>
    );
}
