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
const { Grant } = oidc;

app.use('/interaction', async (req, res, next) => {
  const accountId = 'abc';
  const { 
    grantId,
    params: { client_id: clientId }, 
    prompt: { 
      details: {
        missingOIDCScope = [],
        missingOIDCClaims = [],
        missingResourceScopes = {},
      },     
    },
  } = await oidc.interactionDetails(req, res);

  const grant = grantId != null
    ? await Grant.find(grantId)
    : new Grant({
        accountId,
        clientId,
      });

  grant.addOIDCScope(missingOIDCScope.join(' '));
  grant.addOIDCClaims(missingOIDCClaims);
  Object.entries(missingResourceScopes).forEach( ([indicator, scopes]) => grant.addResourceScope(indicator, scopes.join(' ')));

  const newGrantId = await grant.save();

  return oidc.interactionFinished(req, res, {
    login: {
      accountId,
    },
    consent: { 
      grantId: newGrantId
    },
  });
});
app.use(oidc.callback());
app.listen(3000);
// oidc.use(app);
// oidc.listen(3000);