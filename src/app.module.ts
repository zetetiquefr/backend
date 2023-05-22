import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { User } from "./user/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleModule } from "./role/role.module";
import { Role } from "./role/role.entity";
import { ForumModule } from "./forum/forum.module";
import { Forum } from "./forum/forum.entity";
import { ChatModule } from "./chat/chat.module";
import { Chat } from "./chat/chat.entity";
import { TagModule } from "./tag/tag.module";
import { Tag } from "./tag/tag.entity";
import { AuthModule } from "./auth/auth.module";
import { JWTModule } from "./jwt/jwt.module";
import { AuthMiddleware } from "./middleware/auth.middleware";
import { UserController } from "./user/user.controller";
import { ReportForumModule } from "./report/forum/report.forum.module";
import { ReportForum } from "./report/forum/report.forum.entity";
import { ReportChat } from "./report/chat/report.chat.entity";
import { ReportChatModule } from "./report/chat/report.chat.module";
import { ChatHistoryModule } from "./chatHistory/chatHistory.module";
import { ChatHistory } from "./chatHistory/chatHistory.entity";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "mariadb",
        host: configService.get("DB_HOST"),
        port: +configService.get("DB_PORT"),
        username: configService.get("DB_USERNAME"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_DATABASE"),
        entities: [
          User,
          Role,
          Forum,
          Chat,
          Tag,
          ReportForum,
          ReportChat,
          ChatHistory,
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    RoleModule,
    ForumModule,
    ChatModule,
    TagModule,
    AuthModule,
    JWTModule,
    ReportForumModule,
    ReportChatModule,
    ChatHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({
        path: "/user",
        method: RequestMethod.POST,
      })
      .forRoutes(UserController);
    consumer.apply(AuthMiddleware).forRoutes(
      {
        path: "/chat/edit",
        method: RequestMethod.POST,
      },
      {
        path: "/chat",
        method: RequestMethod.DELETE,
      }
    );
  }
}
