export {}

declare global {
  interface DOMException {
    makeToastErrorMessage(): string
  }
}

DOMException.prototype.makeToastErrorMessage = function(): string {
  switch (this.name) {
    case 'SecurityError': return 'Your browser settings forbid local storage access (third party cookies are disabled). This site won\'t function properly without local storage, please enable it.'
  }

  return `${this.name}: ${this.message}`
}

