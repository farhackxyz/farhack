const withPWA = require('next-pwa')({
    dest: 'public',
});

module.exports = withPWA({
    images: {
        domains: ['i.imgur.com', 'arweave.net'],
    },
});