import { parseCookies } from "nookies";

import { ApiAuthMe } from "~/data/usecases/api-auth-me";

import { makeAuthorizationHttpClient } from "../decorators";

export const makeApiAuthMe = (mapCookies = parseCookies()): ApiAuthMe => {
  return new ApiAuthMe(makeAuthorizationHttpClient(mapCookies));
};
