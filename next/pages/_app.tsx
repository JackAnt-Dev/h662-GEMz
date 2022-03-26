import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";

// Component: 클라에서 호출한 컴포넌트이름 (ex: <domain>/ -> Home,  <domain>/gem -> Gem)
// pageProps: 클라에서 넘겨준 props
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
};

export default MyApp;
