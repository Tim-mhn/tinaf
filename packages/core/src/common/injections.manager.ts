export class InjectionsManager {
  private PROVIDERS: Map<string | symbol, any> = new Map();

  provide<T>(key: string | symbol, value: T) {
    this.PROVIDERS.set(key, value);
    return this;
  }

  get<T>(key: string | symbol, defaultValue?: T): T {
    return this.PROVIDERS.get(key) || defaultValue;
  }
}
