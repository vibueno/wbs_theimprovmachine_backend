class Suggestion {
  private content: object;

  constructor(content: object) {
    this.content = content;
  }

  getContent = (): object => this.content;
}

export default Suggestion;
