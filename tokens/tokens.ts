export default class Tokens {
  static readonly ILLEGAL = "ILLEGAL";
  static readonly EOF = "EOF";
  static readonly IDENT = "IDENT";
  static readonly ASSIGN = "=";
  static readonly VAR = "VAR";
  static readonly CONST = "CONST";

  static #keywords = new Map([
    ["var", Tokens.VAR],
    ["const", Tokens.CONST],
  ]);

  static lookupIdentifier(identifier: string) {
    const token = Tokens.#keywords.get(identifier);
    return token ? token : Tokens.IDENT;
  }
}
