import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Your Name - Portfolio & Projects</title>
        <meta name="description" content="Portfolio showcasing projects like Upscayl Cloud, WriteDown.app and more. Specializing in AI, web development and open source software." />
        {/* Open Graph / Social Media */}
        <meta property="og:title" content="TGS963 - Portfolio & Projects" />
        <meta property="og:description" content="Portfolio showcasing projects like Upscayl Cloud, WriteDown.app and more." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://tgs963.github.io" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TGS963 - Portfolio & Projects" />
        <meta name="twitter:description" content="Portfolio showcasing projects like Upscayl Cloud, WriteDown.app and more." />
        <meta name="twitter:image" content="/og-image.png" />

        {/* Keywords */}
        <meta name="keywords" content="upscayl, AI image upscaling, markdown editor, developer portfolio" />

        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://tgs963.github.io" />
      </Head>
    <ThemeProvider defaultTheme="light" attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
    </>
  );
}
