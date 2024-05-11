import { ResponseEntity } from '@libs/common/response.entity'
import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { SigninDto } from './dto/signin.dto'
import { SignupDto } from './dto/signup.dto'
import { CurrentPaylaod, CurrentUser, Public } from './decorators'
import { ICurrentUser } from './types'
import { RefreshGuard } from './guards'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // HttpCode:: Default 200, POST 201 // 나머지 Module에서는 생략하고 필요할때만 쓰자

  @Public()
  @Post('/sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() dto: SignupDto) {
    await this.authService.signup(dto)
    return ResponseEntity.OK()
  }

  @Public()
  @Post('/sign-in')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() dto: SigninDto) {
    const tokens = await this.authService.signin(dto)
    return ResponseEntity.OK_WITH(tokens)
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@CurrentUser() user: ICurrentUser) {
    await this.authService.logout(user)
    return ResponseEntity.OK()
  }

  @Public()
  @UseGuards(RefreshGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async tokenRefresh(@CurrentUser() user: ICurrentUser, @CurrentPaylaod('refreshToken') refreshToken: string) {
    const tokens = await this.authService.tokenRefresh(user, refreshToken)
    return ResponseEntity.OK_WITH(tokens)
  }
}
