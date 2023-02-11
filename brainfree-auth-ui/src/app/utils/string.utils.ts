export class StringUtils {
  static getInitText(text: string): string {
    return null === text || typeof text === 'undefined' ? '' : text;
  }


  static get passwordPatter(): string {
    return '/((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$/';
  }
}
