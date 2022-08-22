import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../contexts/AuthContext';
import '../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
            <ToastContainer autoClose={2600} />
        </AuthProvider>
    )
}

export default MyApp
