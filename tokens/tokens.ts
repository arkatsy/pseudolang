export const TOKENS = Object.freeze({
  VAR: "VAR",
  CONST: "CONST",
  IF: "IF",
  ELSE: "ELSE",
  THEN: "THEN",
  ENDIF: "ENDIF",
  WHILE: "WHILE",
  FOR: "FOR",
  TO: "TO",
  DO: "DO",
  PRINT: "PRINT",
  INPUT: "INPUT",
  CALL: "CALL",
  FUNCTION: "FUNCTION",
  STEP: "STEP",
  RETURN: "RETURN",
  ENDFUNCTION: "ENDFUNCTION",
  TRUE: "TRUE",
  FALSE: "FALSE",
  NULL: "NULL",
  PLUS: "+",
  MINUS: "-",
  MUL: "*",
  DIV: "/",
  MOD: "%",
  ASSIGN: "=",
  EQ: "==",
  NEQ: "!=",
  LT: "<",
  GT: ">",
  LTE: "<=",
  GTE: ">=",
  AND: "AND",
  OR: "OR",
  NOT: "NOT",
  LPAREN: "(",
  RPAREN: ")",
  LBRACE: "{",
  RBRACE: "}",
  SPACE: " ",
  TAB: "\t",
  NEW_LINE: "\n",
  SEMICOLON: ";",
  COMMA: ",",
  EOF: undefined,
  ILLEGAL: "ILLEGAL",
  IDENT: "IDENT",
  NUMBER: "NUMBER",
});

export enum TokenType {
  VAR = "VAR",
  CONST = "CONST",
  IF = "IF",
  ELSE = "ELSE",
  THEN = "THEN",
  ENDIF = "ENDIF",
  WHILE = "WHILE",
  FOR = "FOR",
  TO = "TO",
  DO = "DO",
  PRINT = "PRINT",
  INPUT = "INPUT",
  PLUS = "PLUS",
  MINUS = "MINUS",
  CALL = "CALL",
  FUNCTION = "FUNCTION",
  STEP = "STEP",
  RETURN = "RETURN",
  ENDFUNCTION = "ENDFUNCTION",
  TRUE = "TRUE",
  FALSE = "FALSE",
  NULL = "NULL",
  MUL = "MUL",
  DIV = "DIV",
  MOD = "MOD",
  ASSIGN = "ASSIGN",
  EQ = "EQ",
  NEQ = "NEQ",
  LT = "LT",
  GT = "GT",
  LTE = "LTE",
  GTE = "GTE",
  AND = "AND",
  OR = "OR",
  NOT = "NOT",
  LPAREN = "LPAREN",
  RPAREN = "RPAREN",
  LBRACE = "LBRACE",
  RBRACE = "RBRACE",
  SPACE = "WHITE_SPACE",
  TAB = "TAB",
  NEW_LINE = "NEW_LINE",
  SEMICOLON = "SEMICOLON",
  COMMA = "COMMA",
  EOF = "EOF",
  ILLEGAL = "ILLEGAL",
  IDENT = "IDENT",
  NUMBER = "NUMBER",
}

// TODO: Map tokens to token types instead of using a switch statement
export const lookupIdentifier = (identifier: string) => {
  switch (identifier) {
    case TOKENS.VAR:
      return TokenType.VAR;
    case TOKENS.CONST:
      return TokenType.CONST;
    case TOKENS.IF:
      return TokenType.IF;
    case TOKENS.ELSE:
      return TokenType.ELSE;
    case TOKENS.WHILE:
      return TokenType.WHILE;
    case TOKENS.FOR:
      return TokenType.FOR;
    case TOKENS.TO:
      return TokenType.TO;
    case TOKENS.DO:
      return TokenType.DO;
    case TOKENS.PRINT:
      return TokenType.PRINT;
    case TOKENS.INPUT:
      return TokenType.INPUT;
    case TOKENS.AND:
      return TokenType.AND;
    case TOKENS.OR:
      return TokenType.OR;
    case TOKENS.NOT:
      return TokenType.NOT;
    case TOKENS.THEN:
      return TokenType.THEN;
    case TOKENS.ENDIF:
      return TokenType.ENDIF;
    case TOKENS.CALL:
      return TokenType.CALL;
    case TOKENS.FUNCTION:
      return TokenType.FUNCTION;
    case TOKENS.STEP:
      return TokenType.STEP;
    case TOKENS.RETURN:
      return TokenType.RETURN;
    case TOKENS.ENDFUNCTION:
      return TokenType.ENDFUNCTION;
    case TOKENS.TRUE:
      return TokenType.TRUE;
    case TOKENS.FALSE:
      return TokenType.FALSE;
    case TOKENS.NULL:
      return TokenType.NULL;
    default:
      return null;
  }
};

export type BaseToken = {
  type: TokenType;
  literal: string;
};

export type Token = BaseToken & {
  start: number;
  end: number;
};
