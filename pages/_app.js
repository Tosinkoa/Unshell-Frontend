import store from "@/store/store"
import { Roboto } from "@next/font/google"
import Aos from "aos"
import "aos/dist/aos.css"
import { ThemeProvider } from "next-themes"
import { useEffect } from "react"
import { Provider } from "react-redux"
import "../styles/globals.css"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
})

export default function App({ Component, pageProps }) {
  useEffect(() => {
    Aos.init({
      easing: "ease-in-out-sine",
      once: false,
      duration: 600,
    })
  }, [])

  return (
    <main className={`${roboto.variable}`}>
      <ThemeProvider enableSystem={true} attribute="class">
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </main>
  )
}
