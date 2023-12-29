import { Body, Controller, HttpStatus, Logger, Post, Res } from '@nestjs/common';
import UsersService from './users.service';
import { CreateUserDto } from './types/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export default class UsersController {
  private logger = new Logger();

  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createUser(@Res() response, @Body() user: CreateUserDto) {
    // log the request
    this.logger.log(`creating user > user name: ${user.name}`);

    // create the user
    const createdUser = await this.usersService.createUser(user);

    return response.status(HttpStatus.CREATED).json({
      status: 201,
      message: 'User has been created successfully',
      createdUser,
    });
  }
}
