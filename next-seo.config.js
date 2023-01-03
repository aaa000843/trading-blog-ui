/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "Noobbtrader",
  titleTemplate: "%s | Noobbtrader",
  defaultTitle: "Noobbtrader",
  description: "Collection of blogs on trading and investments",
  canonical: "https://noobbtrader-blog-ui.onrender.com",
  openGraph: {
    url: "https://noobbtrader-blog-ui.onrender.com",
    title: "Noobbtrader",
    description: "Collection of blogs on trading and investments",
    images: [
      {
        url: "https://og-image.sznm.dev/**noobbtrader**.sznm.dev.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fsznm.dev%2Favataaars.svg&widths=250",
        alt: "noobbtrader.sznm.dev og-image",
      },
    ],
    site_name: "Noobbtrader",
  },
  twitter: {
    handle: "@NoobbTrader",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;
