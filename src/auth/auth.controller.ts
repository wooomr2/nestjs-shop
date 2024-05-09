import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { CurrentPaylaod } from 'src/common/decorators/current-payload.decorator'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { Public } from 'src/common/decorators/public.decorator'
import { RefreshGuard } from 'src/common/guards/jwt-refresh.guard'
import { AuthService } from './auth.service'
import { SigninDto } from './dto/signin.dto'
import { SignupDto } from './dto/signup.dto'
import { ICurrentUser } from './types'
import { ApiTags } from '@nestjs/swagger'


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // HttpCode:: Default 200, POST 201 // 나머지 Module에서는 생략하고 필요할때만 쓰자

  @Public()
  @Post('/sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() dto: SignupDto) {
    return await this.authService.signup(dto)
  }

  @Public()
  @Post('/sign-in')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() dto: SigninDto) {
    return await this.authService.signin(dto)
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@CurrentUser() user: ICurrentUser) {
    return await this.authService.logout(user)
  }

  @Public()
  @UseGuards(RefreshGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async tokenRefresh(@CurrentUser() user: ICurrentUser, @CurrentPaylaod('refreshToken') refreshToken: string) {
    return await this.authService.tokenRefresh(user, refreshToken)
  }
}
