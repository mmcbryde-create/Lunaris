import { PublicClientApplication } from "@azure/msal-browser";
const msalInsttance = new PublicClientApplication({'msaInstance' is assigned avalue but never used
    auth: {
        clientId: "your-client-id",
        authority: "https://login.microsoftonline.com/your-tenant-id",
        redirectUri: "http://localhost:3000",