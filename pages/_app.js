import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../components/navBar";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@fortawesome/fontawesome-free/css/all.css';

function MyApp({ Component, pageProps }) {
  return (
  <>
    <NavBar/>
    <Component {...pageProps} />
  </>
  )
}

export default MyApp
