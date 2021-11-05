import Head from 'next/head'

import Header from "../components/header";

export default function PrimaryLayout({ children }) {
    return (
        <div className="flex flex-col align-middle w-screen min-h-screen">
            <Head>
                <title>Ethereum Transactions Crawler</title>
                <link rel="icon" href={"/favicon.ico"} />
            </Head>

            <main className="flex flex-col w-full bg-gray-100 min-h-screen">
                <Header />

                {children}
            </main>
        </div>
    )
}
