import { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['openrouter.ai'],
  },
  env: {
    OPENROUTER_DEFAULT_MODEL:
      process.env.OPENROUTER_DEFAULT_MODEL ||
      'mistralai/mistral-small-24b-instruct-2501'
  },
};

export default config;
