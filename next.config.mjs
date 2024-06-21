/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        const apiUrl = process.env.NEXT_PUBLIC_MONEY_PLANNER_API_URL;
        if (typeof apiUrl !== 'string') {
            throw new Error('NEXT_PUBLIC_MONEY_PLANNER_API_URL is not defined or not a string');
        }
        return [
            {
                source: '/:path*',
                destination: apiUrl + ':path*',
            },
        ]
    },
};

export default nextConfig;
