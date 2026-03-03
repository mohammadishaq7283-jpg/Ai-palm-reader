const createNextIntlPlugin = require('next-intl/plugin');

// IMPORTANT: Bracket ke andar kuch mat likhein. Khali rakhein ().
// Next.js khud src/i18n/request.ts dhoond lega.
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
};

module.exports = withNextIntl(nextConfig);
