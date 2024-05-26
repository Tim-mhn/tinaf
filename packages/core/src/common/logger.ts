class Logger {
  private PREFIX = '[TINAF]';
  warn(message: string | number | object) {
    console.warn(`${this.PREFIX} ${this._stringifyMessage(message)}`);
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
