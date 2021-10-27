import { parseCookies } from "nookies"
import { ApiLoadFolders } from "~/data/usecases/api-load-folders"
import { makeAuthorizationHttpClient } from "../decorators"

export const makeApiLoadFolders = (mapCookies = parseCookies()) => {
  return new ApiLoadFolders(makeAuthorizationHttpClient(mapCookies))
}
