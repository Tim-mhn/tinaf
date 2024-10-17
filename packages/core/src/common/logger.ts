class Logger {
  private PREFIX = '[TINAF]';
  warn(message: string | number | object, ...args: unknown[]) {
    console.warn(`${this.PREFIX} ${this._stringifyMessage(message)}`, ...args);
  }

  log(message: string | number | object) {
    console.log(`${this.PREFIX} ${this._stringifyMessage(message)}`);
  }

  error(message: string | number | object) {
    console.error(`${this.PREFIX} ${this._stringifyMessage(message)}`);
  }

  info(message: string | number | object) {
    console.info(`${this.PREFIX} ${this._stringifyMessage(message)}`);
  }

  count(message: string | number | object) {
    console.count(`${this.PREFIX} ${this._stringifyMessage(message)}`);
  }

  debug(message: string | number | object) {
    console.debug(`${this.PREFIX} ${this._stringifyMessage(message)}`);
  }

  private _stringifyMessage(message: string | number | object) {
    return typeof message === 'string' ? message : JSON.stringify(message);
  }
}

export const logger = new Logger();

export const logMethod =
  (prefix: string): MethodDecorator =>
  (
    target: object,
    methodName: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    const targetMethod = descriptor.value;

    descriptor.value = function (...args: never[]) {
      console.group(`${prefix}.${methodName.toString()}`);

      const res = targetMethod.apply(this, args);

      console.groupEnd();
      return res;
    };

    return descriptor;
  };
