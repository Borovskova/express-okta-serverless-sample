export const OktaConfig = {
  issuer: "https://dev-36032354.okta.com/oauth2/default",
  audience: "0oanpu62c1bAS9uT35d7",
  get jwksUri() {
    return `${this.issuer}/v1/keys`;
  },
};
