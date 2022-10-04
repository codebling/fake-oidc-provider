const { Provider } = require('oidc-provider');
const oidc = new Provider('http://localhost:3000', {
  features: {
    registration: {
      enabled: true,
    },
  },
});

oidc.listen(3000);