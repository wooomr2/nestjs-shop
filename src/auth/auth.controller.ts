import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { CurrentPaylaod } from 'src/common/decorators/current-payload.decorator'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { Public } from 'src/common/decorators/public.decorator'
import { RefreshGuard } from 'src/common/guards/jwt-refresh.guard'
import { AuthService } from './auth.service'
import { SigninDto } from './dto/signin.dto'
import { SignupDto } from './dto/signup.dto'
import { ICurrentUser, ITokens } from './types'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto)
  }

  @Public()
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  signin(@Body() dto: SigninDto) {
    return this.authService.signin(dto)
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@CurrentUser() user: ICurrentUser) {
    return this.authService.logout(user)
  }

  @Public()
  @UseGuards(RefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  tokenRefresh(
    @CurrentUser() user: ICurrentUser,
    @CurrentPaylaod('refreshToken') refreshToken: string,
  ): Promise<ITokens> {
    return this.authService.tokenRefresh(user, refreshToken)
  }
}
