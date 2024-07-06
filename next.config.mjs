/** @type {import('next').NextConfig} */
import nextIntlPlugin from "next-intl/plugin";
const withNextIntl = nextIntlPlugin("./i18n.ts");

const nextConfig = {
  eslint: {
    dirs: ["app", "lib", "components", "models"],
  },
};

export default withNextIntl(nextConfig);
