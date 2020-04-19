class Logger {

  _prefix = '';

  constructor(prefix) {
    this._prefix = prefix;
  }

  info(...messages) {
    this.log("[INFO]", ...messages);
  }

  error(...messages) {
    this.log("[ERROR]", ...messages);
  }

  log(type, ...messages) {
    if (process.env.NODE_ENV !== 'production') {
      const time = this.getTimeStamp();
      const prefix = this.getPrefixPadded();
      console.log(time, prefix, type, ' -- ', ...messages);
    }
  }

  getPrefixPadded() {
    return this._prefix.padEnd(25, ' ').substr(0, 25);
  }

  getTimeStamp() {
    return new Date().toLocaleTimeString();
  }
}

export default Logger;