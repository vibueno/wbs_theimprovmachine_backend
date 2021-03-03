class Suggestion {
  private title: string;
  private content: string;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }

  getTitle = (): string => this.title;
  getContent = (): string => this.content;
}

export default Suggestion;
