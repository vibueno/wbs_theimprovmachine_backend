class TemplateParamsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TemplateParamsError';
  }
}

class NoTemplateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NoTemplateError';
  }
}

export { TemplateParamsError, NoTemplateError };
