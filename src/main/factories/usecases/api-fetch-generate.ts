import { ApiFetchGenerate } from "~/data/usecases/ApiFetchGenerate"
import { FetchHttpClient } from "~/infra/http-client/fetch-http-client"
import { makeBaseApi } from "../http/base-api"

export const makeApiFetchGenerate = () => {
  return new ApiFetchGenerate(new FetchHttpClient(makeBaseApi()))
}