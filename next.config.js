/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = { nextConfig,
    typescript: {
        // ...
        typeRoots: [
          "./node_modules/@types"
        ]
      }
};
