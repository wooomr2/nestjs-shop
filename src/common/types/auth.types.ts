export type JwtPayload = {
  sub: string // user.id
  email: string
}

export type JwtPayloadWithRt = JwtPayload & { refreshToken: string }

export interface ICurrentUser {
  id: string
  email: string
}

export interface ITokens {
  accessToken: string
  refreshToken: string
}
