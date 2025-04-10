// import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['bcrypt'] // Для работы bcrypt
  }
}

module.exports = nextConfig
