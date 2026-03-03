const createNextIntlPlugin = require('next-intl/plugin');

// Yahan humne bata diya ke file src/i18n.ts hai
const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
};

module.exports = withNextIntl(nextConfig);
