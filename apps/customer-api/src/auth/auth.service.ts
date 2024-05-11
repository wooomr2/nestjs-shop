import { CustomException } from '@libs/common'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { compare, genSalt, hash } from 'bcrypt'
import { UserEntity } from '@libs/db/entities'
import { DataSource, Repository } from 'typeorm'
import { SigninDto } from './dto/signin.dto'
import { SignupDto } from './dto/signup.dto'
import { ICurrentUser, ITokens, JwtPayload } from './types'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async signup(dto: SignupDto): Promise<void> {
    const emailExists = await this.userRepository.exists({ where: { email: dto.email } })
    if (emailExists) throw CustomException.emailExists()

    dto.password = await hash(dto.password, await genSalt(10))
    const userEntity = this.userRepository.create(dto)

    await this.userRepository.save(userEntity)
  }

  async signin(dto: SigninDto): Promise<ITokens> {
    const user = await this.userRepository.findOne({
      select: { id: true, email: true, password: true, roles: true },
      where: { email: dto.email },
    })
    if (!user) throw CustomException.invalidUser()

    const matchPassword = await compare(dto.password, user.password)
    if (!matchPassword) throw CustomException.invalidPassword()

    const tokens = this.#generateTokens(user)
    await this.userRepository.update({ id: user.id }, { refreshToken: tokens.refreshToken })

    return tokens
  }

  async logout(currentUser: ICurrentUser): Promise<void> {
    await this.userRepository.update({ id: currentUser.id }, { refreshToken: null })
  }

  async tokenRefresh(currentUser: ICurrentUser, refreshToken: string): Promise<ITokens> {
    const user = await this.userRepository.findOneBy({ id: currentUser.id })

    if (!user || !user.refreshToken || user.refreshToken !== refreshToken) {
      throw CustomException.accessDenied()
    }

    const tokens = this.#generateTokens(user)
    await this.userRepository.update({ id: user.id }, { refreshToken: tokens.refreshToken })

    return tokens
  }

  #generateTokens({ id, email, roles }: UserEntity): ITokens {
    if (!id || !email || !roles || roles.length < 1) {
      throw new InternalServerErrorException('Token generation failed')
    }

    const jwtPayload: JwtPayload = { sub: id, email: email, roles: roles }

    const accessToken = this.jwtService.sign(jwtPayload, {
      secret: this.config.getOrThrow('ACCESS_TOKEN_SECRET'),
      expiresIn: this.config.getOrThrow('ACCESS_TOKEN_EXPIRE'),
    })

    const refreshToken = this.jwtService.sign(jwtPayload, {
      secret: this.config.getOrThrow('REFRESH_TOKEN_SECRET'),
      expiresIn: this.config.getOrThrow('REFRESH_TOKEN_EXPIRE'),
    })

    return { accessToken, refreshToken }
  }
}
