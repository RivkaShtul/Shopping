import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import store from "./store/store";
import ShoppingForm from "./components/ShoppingForm";
import Cart from "./components/Cart";
import Header from "./components/Header";
import CheckoutForm from "./components/CheckoutForm";
import { theme } from "./theme";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div dir="rtl">
          <Header />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <ShoppingForm />
            <Cart />
          </Container>
          <CheckoutForm />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
