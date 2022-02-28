import { ChakraProvider } from "@chakra-ui/react";
import { DefaultSeo } from "next-seo";
import { MoralisProvider } from "react-moralis";

import theme from "@/theme/index";
import Layout from "@/layouts/global";
import SEO from "next-seo.config";

import "@fontsource/poppins/latin-400.css";
import "@fontsource/poppins/latin-500.css";
import "@fontsource/poppins/latin-600.css";
import "@fontsource/poppins/latin-700.css";
import "@/styles/index.css";

const MyApp = ({ Component, pageProps }) => (
  <>
    <DefaultSeo {...SEO} />
    <MoralisProvider appId="mOZeQBOivRoJ97kPtWuE2Xh0hv3puoY0ydgHsahZ" serverUrl="https://bttofcpomrb3.usemoralis.com:2053/server">
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </MoralisProvider>
  </>
);

export default MyApp;
