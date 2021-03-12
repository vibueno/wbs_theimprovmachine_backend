class TemplateParamsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TemplateParamsError';
  }
}

class TemplateInvalidError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TemplateInvalidError';
  }
}

class ExternalAPIAccessError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ExternalAPIAccessError';
  }
}

export { TemplateParamsError, TemplateInvalidError, ExternalAPIAccessError };
