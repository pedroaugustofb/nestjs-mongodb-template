import { Body, Controller, Logger, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import AuthService from './auth.service';
import { LoginDto } from './types/login.dto';

@Controller('auth')
@ApiTags('auth')
export default class AuthController {
  private logger = new Logger();

  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Try to login an user.' })
  @ApiResponse({ status: 200, description: 'User logged in successfully.' })
  @ApiResponse({ status: 404, description: 'Bad Request.' })
  async login(@Res() response, @Body() login: LoginDto) {
    try {
      this.logger.log(`loggin user > ${login.email}`);

      const data = await this.authService.login(login);

      return response.status(200).json({
        status: 200,
        message: 'User logged in successfully.',
        data,
      });
      // here you can do whatever you want with the login data
    } catch (error) {
      this.logger.error(`error on login > ${error}`);
      return response.status(404).json({ status: 404, message: 'Bad Request.' });
    }
  }
}
