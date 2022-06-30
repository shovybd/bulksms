import Head from "next/head";
import Script from "next/script";
import AuthProvider from "../src/context/AuthProvider/AuthProvider";
import "../styles/globals.css";
import "../styles/style.scss";

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || EmptyLayout;

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>DotOnline Camaign App</title>

        {/* <!-- <meta
      name="description"
      content=""
    /> --> */}
      </Head>

      <AuthProvider>
        {/* bootstrap cdn links  */}
        <Script src="https://code.jquery.com/jquery-3.4.1.js"></Script>
        <Script
          src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"
          integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p"
          crossorigin="anonymous"
        ></Script>

        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js"
          integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF"
          crossorigin="anonymous"
        ></Script>

        <Script
          src="https://www.google.com/recaptcha/api.js"
          async
          defer
        ></Script>

        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </>
  );
}

const EmptyLayout = ({ children }) => <>{children}</>;

export default MyApp;
