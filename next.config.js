const createNextIntlPlugin = require('next-intl/plugin');

// Ab bracket khali rakhein ()
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
};

module.exports = withNextIntl(nextConfig);
