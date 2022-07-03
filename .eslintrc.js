module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ['prettier'],
  rules: {
    'react/jsx-key': 'off',
  },
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
};
