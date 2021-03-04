class Suggestion {
  private content: string;

  constructor(content: string) {
    this.content = content;
  }

  getContent = (): string => this.content;
}

export default Suggestion;
