import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(private configService: ConfigService) {
    const jwtSecret = configService.get<string>('JWT_SEC');
    
    if (!jwtSecret) {
      throw new Error('JWT_SEC is not defined in the environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });

    this.logger.debug(`JWT Strategy initialized`);
  }

  async validate(payload: any) {
    this.logger.debug(`Validating JWT payload: ${JSON.stringify(payload)}`);
    if (!payload.sub || !payload.username) {
      throw new UnauthorizedException('Invalid token payload');
    }
    return { userId: payload.sub, username: payload.username };
  }
}