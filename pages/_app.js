import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../components/navBar";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@fortawesome/fontawesome-free/css/all.css';
import {CartProvider} from "../Context/CartContext";
import ChatWidget from "../components/ChatWidget";

function MyApp({ Component, pageProps }) {
  return (
  <>
    {/*<NavBar/>*/}
    {/*<Component {...pageProps} />*/}

    <CartProvider>
      <NavBar/>
      <Component {...pageProps} />
      <ChatWidget />
    </CartProvider>
  </>
  )
}

export default MyApp
