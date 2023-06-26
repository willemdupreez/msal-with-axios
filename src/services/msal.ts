import * as msal from "@azure/msal-browser";
import { RedirectRequest } from "@azure/msal-browser";

const clientId = process.env.REACT_APP_CLIENT_ID;
const tenantId = process.env.REACT_APP_TENANT_ID;
const scopesString = process.env.REACT_APP_API_SCOPES;

if (!clientId) {
  throw new Error("Missing client ID");
}
if (!tenantId) {
  throw new Error("Missing tenant ID");
}
if (!scopesString) {
  throw new Error("Missing API scopes");
}
const msalConfig = {
  auth: {
    clientId,
    authority: `https://login.microsoftonline.com/${tenantId}/`,
  },
};

const scopes = scopesString.split(" ");
const loginRequest: RedirectRequest = {
  scopes,
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

export { msalInstance, loginRequest, scopes };
