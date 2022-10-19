import "../styles/globals.css";
import { Layout } from "../components";
import Head from "next/head";
import Image from "next/image";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Invoices</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
