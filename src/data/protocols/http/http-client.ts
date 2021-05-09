export interface HttpClient<T = any> {
  request: (params: HttpRequest) => Promise<HttpResponse<T>>
}

export enum HttpStatusCode {
  ok = 200,
  notFound = 404,
  forbidden = 403
}

export enum HttpMethodType {
  get = 'GET',
  post = 'POST'
}

export type HttpRequest = {
  url: string
  method: HttpMethodType
  body?: {}
  params?: { [key: string]: string }
  headers?: { [key: string]: string }
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode
  body?: T
}
