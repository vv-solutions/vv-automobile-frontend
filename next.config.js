/** @type {import('next').NextConfig} */
module.exports = {

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:8081/:path*',
      },
      // {
      //   source: '/login/:path*',
      //   destination: process.env.API_URL+':8080/:path*',
      // },
    ];
  },



};