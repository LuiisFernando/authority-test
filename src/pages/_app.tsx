import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyles from 'styles/Global';
import AppProvider from 'context';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppProvider>
        <GlobalStyles />
        <ToastContainer />
        <Component {...pageProps} />
      </AppProvider>
    </>
  );
}
export default MyApp
