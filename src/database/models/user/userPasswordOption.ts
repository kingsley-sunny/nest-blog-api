export class UserPasswordOption {
  private static isPasswordHidden = true;

  public static hidePassword() {
    this.isPasswordHidden = true;
  }

  public static showPassword() {
    UserPasswordOption.isPasswordHidden = false;
  }

  public static getStatus() {
    return UserPasswordOption.isPasswordHidden;
  }
}
