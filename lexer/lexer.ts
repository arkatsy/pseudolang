import { TOKENS, TokenType, type Token, lookupIdentifier, type BaseToken } from "tokens/tokens";
import chalk from "chalk";

type LexerOptions = {
  debugPos?: boolean;
  debugTokens?: boolean;
};

// TODO: Should the `start` and `end` positions in the tokens ignore whitespace such as \n, \t, and space?
export default class Lexer {
  source: string;
  cursor: number;
  char: string;
  pos: {
    line: number;
    column: number;
  };
  DEBUG_POSITION: boolean;
  DEBUG_TOKENS: boolean;

  constructor(source: string, opts: LexerOptions = {}) {
    this.source = source;
    this.cursor = 0;
    this.char = source[0];
    this.pos = {
      line: 1,
      column: 1,
    };
    this.DEBUG_POSITION = opts.debugPos ?? false;
    this.DEBUG_TOKENS = opts.debugTokens ?? false;
  }

  // TODO: Improve logging & Error handling. Right now it's logs the errors.
  log = (...msg: any) => console.log(chalk.greenBright(`[Lexer] [LOG]`), ...msg);
  warn = (...msg: any) => console.warn(chalk.yellowBright(`[Lexer] [WARNING]`), ...msg);
  error = (...msg: any) => console.error(chalk.redBright(`[Lexer] [ERROR]`), ...msg);

  debug = (...msg: any) => console.debug(chalk.blueBright(`[Lexer] [DEBUG]`), ...msg);
  debugPos = (...msg: any) => this.DEBUG_POSITION && this.debug(...msg);
  debugTokens = (token: BaseToken) =>
    this.DEBUG_TOKENS &&
    this.debug(
      `Found token of type ${token.type} (${JSON.stringify(token.literal)}) at line ${
        this.pos.line
      }, column ${this.pos.column} (cursor: ${this.cursor})`
    );

  lex() {
    let tokens: Token[] = [];

    try {
      let token = this.nextToken();
      if (token.type == TokenType.EOF) this.warn("Source is empty");

      while (token.type !== TokenType.EOF) {
        // TODO: Currently we are ignoring whitespace tokens, but what's the point of
        // creating them in the first place.
        const isTokenWhitespace =
          token.type === TokenType.NEW_LINE || token.type === TokenType.SPACE || token.type === TokenType.TAB;
        if (!isTokenWhitespace) {
          tokens.push(token);
        } else {
          this.debugTokens(token);
        }
        token = this.nextToken();
      }
    } catch (e) {
      this.error(e);
    }

    return tokens;
  }

  advancePos() {
    if (this.char === TOKENS.NEW_LINE) {
      this.pos.line++;
      this.pos.column = 1;
    } else {
      this.pos.column++;
    }
    this.debugPos(
      `Char ${JSON.stringify(this.char)} has been read. Advancing position to line ${this.pos.line}, column ${
        this.pos.column
      } (cursor: ${this.cursor})`
    );
  }

  retreatPos() {
    if (this.char === TOKENS.NEW_LINE) {
      this.pos.line--;
      this.pos.column = 1;
    } else {
      this.pos.column--;
    }
    this.debugPos(
      `Char ${JSON.stringify(this.char)} has been read. Retreating position to line ${
        this.pos.line
      }, column ${this.pos.column} (cursor: ${this.cursor})`
    );
  }

  nextToken() {
    let token: Token | null = null;
    this.debugPos(
      `Reading next token at line ${this.pos.line}, column ${this.pos.column} (cursor: ${this.cursor})`
    );

    let start = this.cursor;
    switch (this.char) {
      case TOKENS.ASSIGN: {
        let literal = this.char;
        if (this.peekChar() === TOKENS.ASSIGN) {
          literal += this.readChar();

          this.debugTokens({ type: TokenType.EQ, literal });
          token = { type: TokenType.EQ, literal, start, end: this.cursor };
        } else {
          this.debugTokens({ type: TokenType.ASSIGN, literal });
          token = { type: TokenType.ASSIGN, literal, start, end: this.cursor };
        }
        break;
      }
      case TOKENS.COMMA: {
        this.debugTokens({ type: TokenType.COMMA, literal: this.char });
        token = { type: TokenType.COMMA, literal: this.char, start, end: this.cursor };
        break;
      }
      case TOKENS.LT: {
        let literal = this.char;
        if (this.peekChar() === TOKENS.EQ) {
          literal += this.readChar();

          this.debugTokens({ type: TokenType.LTE, literal });
          token = { type: TokenType.LTE, literal, start, end: this.cursor };
        } else {
          this.debugTokens({ type: TokenType.LT, literal });
          token = { type: TokenType.LT, literal, start, end: this.cursor };
        }
        break;
      }
      case TOKENS.GT: {
        let literal = this.char;
        if (this.peekChar() === TOKENS.EQ) {
          literal += this.readChar();

          this.debugTokens({ type: TokenType.GTE, literal });
          token = { type: TokenType.GTE, literal, start, end: this.cursor };
        } else {
          this.debugTokens({ type: TokenType.GT, literal });
          token = { type: TokenType.GT, literal, start, end: this.cursor };
        }
        break;
      }
      case TOKENS.PLUS: {
        this.debugTokens({ type: TokenType.PLUS, literal: this.char });
        token = { type: TokenType.PLUS, literal: this.char, start, end: this.cursor };
        break;
      }
      case TOKENS.MINUS: {
        this.debugTokens({ type: TokenType.MINUS, literal: this.char });
        token = { type: TokenType.MINUS, literal: this.char, start, end: this.cursor };
        break;
      }
      case TOKENS.MUL: {
        this.debugTokens({ type: TokenType.MUL, literal: this.char });
        token = { type: TokenType.MUL, literal: this.char, start, end: this.cursor };
        break;
      }
      case TOKENS.DIV: {
        this.debugTokens({ type: TokenType.DIV, literal: this.char });
        token = { type: TokenType.DIV, literal: this.char, start, end: this.cursor };
        break;
      }
      case TOKENS.MOD: {
        this.debugTokens({ type: TokenType.MOD, literal: this.char });
        token = { type: TokenType.MOD, literal: this.char, start, end: this.cursor };
        break;
      }
      case TOKENS.NEW_LINE: {
        this.debugTokens({ type: TokenType.NEW_LINE, literal: this.char });
        token = { type: TokenType.NEW_LINE, literal: this.char, start, end: this.cursor };
        break;
      }
      case TOKENS.SPACE: {
        this.debugTokens({ type: TokenType.SPACE, literal: this.char });
        token = { type: TokenType.SPACE, literal: this.char, start, end: this.cursor };
        break;
      }
      case TOKENS.LPAREN: {
        this.debugTokens({ type: TokenType.LPAREN, literal: this.char });
        token = { type: TokenType.LPAREN, literal: this.char, start, end: this.cursor };
        break;
      }
      case TOKENS.RPAREN: {
        this.debugTokens({ type: TokenType.RPAREN, literal: this.char });
        token = { type: TokenType.RPAREN, literal: this.char, start, end: this.cursor };
        break;
      }
      case TOKENS.EOF: {
        this.debugTokens({ type: TokenType.EOF, literal: "" });
        token = { type: TokenType.EOF, literal: "", start, end: this.cursor };
        break;
      }
      default: {
        if (Lexer.isLetter(this.char)) {
          let literal = this.readChar();
          while (Lexer.isLetter(this.char)) {
            literal += this.readChar();
          }
          const end = this.cursor - 1;

          let type = lookupIdentifier(literal); // returns null if not a keyword
          if (!type) {
            type = TokenType.IDENT;
          }

          this.debugTokens({ type, literal });
          token = { type, literal, start, end };

          // `this.char` points to the next character and since after
          // the switch we are advancing, we end up skipping a character.
          // Same thing for the numbers below. That's why we go back by one character.
          this.retreat();

          break;
        } else if (Lexer.isDigit(this.char)) {
          let literal = this.readChar();
          while (Lexer.isDigit(this.char) || this.char === ".") {
            literal += this.readChar();
          }

          if (Lexer.isLetter(this.char)) {
            throw `Unexpected sequence of characters: "${literal}${this.char}" at line ${this.pos.line}, column ${this.pos.column} (cursor: ${this.cursor})`;
          }
          const end = this.cursor - 1;

          this.debugTokens({ type: TokenType.NUMBER, literal });
          token = { type: TokenType.NUMBER, literal, start, end };

          this.retreat();
          break;
        }

        throw `Unknown token: "${this.char}" at line ${this.pos.line}, column ${this.pos.column} (cursor: ${this.cursor})`;
      }
    }

    this.advance();
    return token;
  }

  advance() {
    this.advancePos();
    this.cursor += 1;
    this.char = this.source[this.cursor];
  }

  retreat() {
    this.retreatPos();
    this.cursor -= 1;
    this.char = this.source[this.cursor];
  }

  readChar() {
    const char = this.char;
    this.advance();
    return char;
  }

  peekChar() {
    return this.source[this.cursor + 1];
  }

  static isLetter(char: string) {
    const charCode = char?.charCodeAt(0);
    return (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122);
  }

  static isDigit(char: string) {
    const charCode = char?.charCodeAt(0);
    return charCode >= 48 && charCode <= 57;
  }

  static isWhitespace(char: string) {
    return char === TOKENS.SPACE || char === TOKENS.TAB || char === TOKENS.NEW_LINE;
  }
}
