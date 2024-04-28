
export interface Tokens {
  access_token: string,
  refresh_token: string
}

export interface TokenPayload {
  sub: string,
  email?: string | null,
  name?: string | null
}

export interface CreateTokensInput {
  refreshPayload: TokenPayload,
  accessPayload: TokenPayload
}

export interface SignInInput {
  email: string, password: string
}

export interface SignUpInput extends SignInInput {
  name: string
}

export interface RequestWithUser extends Request {
  user: TokenPayload;
}
