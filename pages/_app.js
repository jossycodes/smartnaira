import '../styles/globals.css'
import 'uikit/dist/css/uikit.css'
import 'bootstrap-icons/font/bootstrap-icons.css' 
import '../styles/verify.input.css' 
import { SessionProvider } from "next-auth/react"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
 