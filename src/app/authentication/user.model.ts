export class User {
  constructor(
    public email: string,
    public id: string,
    private TOKEN: string,
    private TOKEN_EXPIRATION_DATE: Date,
  ) { }

  get token() {
    if (!this.TOKEN_EXPIRATION_DATE || (new Date() > this.TOKEN_EXPIRATION_DATE)) {
      return null;
    }
    return this.TOKEN;
  }
}
