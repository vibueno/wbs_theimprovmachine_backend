class TemplateParamsError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, TemplateParamsError.prototype);
    this.name = 'TemplateParamsError';
  }
}

class TemplateInvalidError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, TemplateInvalidError.prototype);
    this.name = 'TemplateInvalidError';
  }
}

class ExternalAPIAccessError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ExternalAPIAccessError.prototype);
    this.name = 'ExternalAPIAccessError';
  }
}

export { TemplateParamsError, TemplateInvalidError, ExternalAPIAccessError };
