/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/auth/login',
          destination: '/',
          permanent: false,
        },
        
      ]
    },
  };
  
  export default nextConfig;