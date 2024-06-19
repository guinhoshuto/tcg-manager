/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns:[{
            hostname: 'en.onepiece-cardgame.com'
        },
        {
            hostname: 'f68e554b630c9e477a4d5a3706cccc56.r2.cloudflarestorage.com'
        },
        {
            hostname: 'pub-46b306762cd845f6b6e0eb123db13ef4.r2.dev'
        }
    ]}
};

export default nextConfig;
