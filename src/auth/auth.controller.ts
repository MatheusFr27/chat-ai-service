import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard, Public } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() body: { email: string, password: string }) {
      return this.authService.signIn(body.email, body.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() request) {
        return request.user;
    }
}
