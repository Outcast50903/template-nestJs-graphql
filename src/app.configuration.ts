import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TerminusModule } from '@nestjs/terminus';
import { CaslModule } from 'nest-casl';
import { TypegooseModule } from 'nestjs-typegoose';

import { Roles } from './roles';

export const AppImports = [
  ConfigModule.forRoot({ isGlobal: true }),
  GraphQLModule.forRoot<ApolloDriverConfig>({
    autoSchemaFile: 'schema-generated.gql',
    playground: true,
    debug: true,
    introspection: true,
    driver: ApolloDriver,
  }),
  TypegooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (config: ConfigService) => ({
      uri: config.get<string>('MONGO_URL', process.env.MONGO_URL),
      useNewUrlParser: true,
      // useCreateIndex: true,
      // useUnifiedTopology: true,
      // useFindAndModify: false,
      retryWrites: false,
      dbName: 'dev',
    }),
    inject: [ConfigService],
  }),
  CaslModule.forRoot<Roles>({
    superuserRole: Roles.ADMIN_ROLE,
    getUserFromRequest: (request) => request.user,
  }),
  TerminusModule,
];
