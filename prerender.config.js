// Configuration for prerendering routes
// This helps search engines better index your React single-page application

module.exports = {
  // Routes to prerender
  routes: [
    '/',
    '/about',
    '/projects',
    '/experience',
    '/contact'
  ],
  
  // User agents that should receive prerendered content
  userAgents: [
    'googlebot',
    'bingbot',
    'yandex',
    'baiduspider',
    'facebookexternalhit',
    'twitterbot',
    'rogerbot',
    'linkedinbot',
    'embedly',
    'quora link preview',
    'showyoubot',
    'outbrain',
    'pinterest/0.',
    'developers.google.com/+/web/snippet',
    'slackbot',
    'vkShare',
    'W3C_Validator',
    'redditbot',
    'Applebot',
    'WhatsApp',
    'flipboard',
    'tumblr',
    'bitlybot',
    'SkypeUriPreview',
    'nuzzel',
    'Discordbot',
    'Google Page Speed',
    'Qwantify',
    'pinterestbot',
    'Bitrix link preview',
    'XING-contenttabreceiver',
    'Chrome-Lighthouse'
  ]
};
