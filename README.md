# Fake OIDC Provider

Fake OpenID Connect Provider which authenticates all requests without prompting for username or password.

# Quick start

```
npx codebling/fake-oidc-provider
```

Set the port environment variable to change the port.

# Problem
Unit testing for OpenID Connect authentication doesn't usually make sense, and end-to-end testing creates CI/CD headaches.

This project simplifies this by automatically authenticating any request. Use environment variables to control the port on which the server listens.



