export class WrongCredentialsError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'WrongCredentials'
  }
}

export class WrongCaptchaError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'WrongCaptcha'
  }
}
