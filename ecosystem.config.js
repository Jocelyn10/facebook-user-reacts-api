module.exports = {
    apps: [
      {
        name: `facebook-user-reacts-api`,
        script: './index.js',
        instances: 'max',
        env: {
          NODE_ENV: 'localhost',
        },
        env_development: {
          NODE_ENV: process.env.NODE_ENV,
        },
        env_staging: {
          NODE_ENV: process.env.NODE_ENV,
        },
        env_production: {
          NODE_ENV: process.env.NODE_ENV,
        },
      },
    ],
  };
  