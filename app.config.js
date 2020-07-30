import "dotenv/config";

const appNamae = "myplantapp";

export default {
  name: appNamae,
  slug: appNamae,
  version: "1.0.0",
  assetBundlePatterns: ["**/*"],
  platforms: ["ios"],
  ios: {
    bundleIdentifier: "com.codify.myplant",
    buildNumber: "1.0.0",
  },
  extra: {
    firebase_apiKey: process.env.firebase_apiKey,
    firebase_authDomain: process.env.firebase_authDomain,
    firebase_databaseURL: process.env.firebase_databaseURL,
    firebase_projectId: process.env.firebase_projectId,
    push_ENDPOINT: process.env.push_ENDPOINT,
  },
};
