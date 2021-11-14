import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TerminusModule } from '@nestjs/terminus';
import { AccessControlModule } from 'nestjs-role-protected';
import { TypegooseModule } from 'nestjs-typegoose';

import { roles } from './roles';

export const AppImports = [
  ConfigModule.forRoot({ isGlobal: true }),
  GraphQLModule.forRoot({
    autoSchemaFile: 'schema-generated.gql',
    playground: true,
    debug: true,
    introspection: true,
  }),
  TypegooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (config: ConfigService) => ({
      uri: config.get<string>('MONGO_URL', process.env.MONGO_URL),
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      retryWrites: false,
      dbName: 'dev',
    }),
    inject: [ConfigService],
  }),
  AccessControlModule.forRoles(roles),
  TerminusModule,
];
