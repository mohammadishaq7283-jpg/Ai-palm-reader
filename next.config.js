const createNextIntlPlugin = require('next-intl/plugin');

// Note: Humne './i18n.ts' likha hai (src hata diya)
const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
};

module.exports = withNextIntl(nextConfig);
