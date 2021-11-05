import 'tailwindcss/tailwind.css'

import { AppContextProvider } from "../contexts"

import PrimaryLayout from "../layouts";

function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <PrimaryLayout>
        <Component {...pageProps} />
      </PrimaryLayout>
    </AppContextProvider>
  )
}

export default MyApp
