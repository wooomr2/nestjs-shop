import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { compare, genSalt, hash } from 'bcrypt'
import { ICurrentUser, ITokens, JwtPayload } from 'src/common/types/auth.types'
import { UserEntity } from 'src/entities/user.entity'
import { DataSource, Repository } from 'typeorm'
import { SigninDto } from './dto/signin.dto'
import { SignupDto } from './dto/signup.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(dto: SignupDto) {
    console.log(dto)
    const emailExists = await this.userRepository.existsBy({ email: dto.email })
    if (emailExists) throw new BadRequestException('Email already exists')

    dto.password = await hash(dto.password, await genSalt(10))
    const userEntity = this.userRepository.create(dto)

    const user = await this.userRepository.save(userEntity)

    return user
  }

  async signin(dto: SigninDto): Promise<ITokens> {
    const user = await this.userRepository.findOne({ where: { email: dto.email } })
    if (!user) throw new BadRequestException('invalid user')

    const matchPassword = await compare(dto.password, user.password)
    if (!matchPassword) throw new ForbiddenException('Invalid credentials')

    delete user.password

    const tokens = this.#generateTokens(user)
    await this.userRepository.update({ id: user.id }, { refreshToken: tokens.refreshToken })

    return tokens
  }

  async logout(currentUser: ICurrentUser) {
    await this.userRepository.update({ id: currentUser.id }, { refreshToken: null })
  }

  async tokenRefresh(currentUser: ICurrentUser, refreshToken: string) {
    const user = await this.userRepository.findOneBy({ id: currentUser.id })

    if (!user || !user.refreshToken || user.refreshToken !== refreshToken) {
      throw new ForbiddenException('Access Denied')
    }

    const tokens = this.#generateTokens(user)
    await this.userRepository.update({ id: user.id }, { refreshToken: tokens.refreshToken })

    return tokens
  }

  #generateTokens(user: UserEntity): ITokens {
    const jwtPayload: JwtPayload = { sub: user.id, email: user.email }

    const accessToken = this.jwtService.sign(jwtPayload, {
      secret: this.configService.getOrThrow('ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.getOrThrow('ACCESS_TOKEN_EXPIRE'),
    })

    const refreshToken = this.jwtService.sign(jwtPayload, {
      secret: this.configService.getOrThrow('REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.getOrThrow('REFRESH_TOKEN_EXPIRE'),
    })

    return { accessToken, refreshToken }
  }
}
