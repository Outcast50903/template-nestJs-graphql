import { forwardRef, Module } from '@nestjs/common';

import { AuthModule } from '../auth.module';

import { googleProviders } from './google.provider';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [...googleProviders],
})
export class GoogleModule {}
