import { Injectable, Provider } from '@nestjs/common';

@Injectable()
export class ProviderInjector {
  static inject(
    providers: (Provider & { isActive: boolean })[],
    defaultProvider: Provider,
  ): Provider {
    const ActiveProvider = providers.find((provider) => provider.isActive);

    return ActiveProvider || defaultProvider;
  }
}
