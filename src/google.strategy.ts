import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: '246557576353-37bnvioe0s2j882gl616qr2fjdeop0p9.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:5000/auth/google/callback',
            scope: ['email', 'profile'],
        });
    }
    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { name, emails, photos } = profile
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken
        }
        done(null, user);
    }
}