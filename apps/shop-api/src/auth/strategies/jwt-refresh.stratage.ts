import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtPayload, JwtPayloadWithRt } from '../types'

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    })
  }

  // https://docs.nestjs.com/recipes/passport
  // For the jwt-strategy,
  // Passport first verifies the JWT's signature and decodes the JSON.
  // It then invokes our validate() method passing the decoded JSON as its single parameter.
  // Based on the way JWT signing works,
  // we're guaranteed that we're receiving a valid token that we have previously signed and issued to a valid user.

  validate(req: Request, payload: JwtPayload): JwtPayloadWithRt {
    const refreshToken = req?.headers?.authorization?.replace('Bearer', '').trim()

    return {
      ...payload,
      refreshToken: refreshToken!,
    }
  }
}
