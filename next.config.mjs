/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;

module.exports = {
    async rewrites() {
        return [
            {
                source: '/:path*',
                destination: process.env.NEXT_PUBLIC_MONEY_PLANNER_API_URL + ':path*',
            },
        ]
    },
};