import "../styles/globals.css";
import { VoidNerdProvider } from "../context/VoidNerd";

function MyApp({ Component, pageProps }) {
  return (
    <VoidNerdProvider>
      <Component {...pageProps} />
    </VoidNerdProvider>
  );
}

export default MyApp;
