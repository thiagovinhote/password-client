import { Either } from '~/common/either'
import { FetchGenerate } from '~/domain/usecases/fetch-generate'
import { Usecase } from '~/domain/usecases/usecase'
import {
  AccessDeniedError,
  InvalidResourceError,
  UnexpectedError
} from '../errors'
import {
  HttpClient,
  HttpMethodType,
  HttpStatusCode
} from '../protocols/http/http-client'

export class ApiFetchGenerate
  implements Usecase<FetchGenerate.Params, FetchGenerate.Result> {
  constructor(
    private readonly httpClient: HttpClient<FetchGenerate.ResponseDTO>
  ) {}

  async exec(params: FetchGenerate.Params): FetchGenerate.Result {
    const response = await this.httpClient.request({
      url: '/api/generate',
      method: HttpMethodType.post,
      body: {
        include_numbers: params.includeNumbers,
        lowercase_characters: params.lowercaseCharacters,
        uppercase_characters: params.uppercaseCharacters,
        password_size: params.passwordSize
      }
    })

    switch (response.statusCode) {
      case HttpStatusCode.forbidden:
        return Either.left(AccessDeniedError.create())
      case HttpStatusCode.notFound:
        return Either.left(InvalidResourceError.create())
      case HttpStatusCode.serverError:
        return Either.left(UnexpectedError.create())
    }

    return Either.right(response.body.result)
  }
}
