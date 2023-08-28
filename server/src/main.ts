import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as session from 'express-session';
import {CLIENT_DOMAIN, SESSION_SECRET} from "../config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: true,
        credentials: true,
    })
    app.use(session({
            secret: SESSION_SECRET,
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: false,
                maxAge: 1000*60*60*24,
                sameSite: 'strict',
                domain: CLIENT_DOMAIN,
            },
        })
    )
    app.setGlobalPrefix('api')
    await app.listen(8000);
}

bootstrap();
