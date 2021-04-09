import Constants from "expo-constants";
import ENV from "../variables";

const getEnvVars = (env = "") => {
  if (env === null || env === undefined || env === "") return ENV.dev;
  if (env.indexOf("dev") !== -1) return ENV.dev;
  if (env.indexOf("staging") !== -1) return ENV.staging;
  if (env.indexOf("prod") !== -1) return ENV.prod;
};

export default getEnvVars(Constants.manifest.releaseChannel);
