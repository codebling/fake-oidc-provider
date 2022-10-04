const express = require('express');
const { Provider } = require('oidc-provider');

const app = express();

const oidc = new Provider('http://localhost:3000', {
  features: {
    registration: {
      enabled: true,
    },
    devInteractions: { enabled: false },
  },
});


app.use('/interaction', async (req, res, next) => {
  const details = await oidc.interactionDetails(req, res);
  return oidc.interactionFinished(req, res, {
    login: {
      accountId: 'abc',
    },
  });
});
app.use(oidc.callback());
app.listen(3000);
// oidc.use(app);
// oidc.listen(3000);