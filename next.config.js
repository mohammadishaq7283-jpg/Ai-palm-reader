const createNextIntlPlugin = require('next-intl/plugin');

// Yahan hum explicitly bata rahe hain ke file kahan hai
const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
};

module.exports = withNextIntl(nextConfig);
