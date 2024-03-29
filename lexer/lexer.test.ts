import { TokenType, type BaseToken, TokenPosition, Token } from "tokens/tokens";
import Lexer from "./lexer";
import { test, expect } from "vitest";

test.each<[string, BaseToken[]]>([
  ["=", [{ type: TokenType.ASSIGN, literal: "=" }]],
  ["==", [{ type: TokenType.EQ, literal: "==" }]],
  ["+", [{ type: TokenType.PLUS, literal: "+" }]],
  ["-", [{ type: TokenType.MINUS, literal: "-" }]],
  ["*", [{ type: TokenType.MUL, literal: "*" }]],
  ["/", [{ type: TokenType.DIV, literal: "/" }]],
  ["%", [{ type: TokenType.MOD, literal: "%" }]],
  ["VAR", [{ type: TokenType.VAR, literal: "VAR" }]],
  ["CONST", [{ type: TokenType.CONST, literal: "CONST" }]],
  ["IF", [{ type: TokenType.IF, literal: "IF" }]],
  // prettier-ignore
  ["ELIF", [{ type: TokenType.ELIF, literal: "ELIF" }, { type: TokenType.ELIF, literal: "ELIF" }]],
  ["ELSE", [{ type: TokenType.ELSE, literal: "ELSE" }]],
  ["WHILE", [{ type: TokenType.WHILE, literal: "WHILE" }]],
  ["FOR", [{ type: TokenType.FOR, literal: "FOR" }]],
  ["TO", [{ type: TokenType.TO, literal: "TO" }]],
  ["STEP", [{ type: TokenType.STEP, literal: "STEP" }]],
  ["DO", [{ type: TokenType.DO, literal: "DO" }]],
  ["ENDIF", [{ type: TokenType.ENDIF, literal: "ENDIF" }]],
  ["ENDFUNCTION", [{ type: TokenType.ENDFUNCTION, literal: "ENDFUNCTION" }]],
  ["ENDWHILE", [{ type: TokenType.ENDWHILE, literal: "ENDWHILE" }]],
  // prettier-ignore
  ["VAR X = 11", [
    { type: TokenType.VAR, literal: "VAR" },
    { type: TokenType.IDENT, literal: "X" },
    { type: TokenType.ASSIGN, literal: "=" },
    { type: TokenType.NUMBER, literal: "11" },
  ]],
  // prettier-ignore
  ["VAR y = 22", [
    { type: TokenType.VAR, literal: "VAR" },
    { type: TokenType.IDENT, literal: "y" },
    { type: TokenType.ASSIGN, literal: "=" },
    { type: TokenType.NUMBER, literal: "22" },
  ]],
  ["22", [{ type: TokenType.NUMBER, literal: "22" }]],
  ["22.4", [{ type: TokenType.NUMBER, literal: "22.4" }]],
  // prettier-ignore
  ["(22 + 3.5)", [
    { type: TokenType.LPAREN, literal: "(" }, 
    { type: TokenType.NUMBER, literal: "22" },
    { type: TokenType.PLUS, literal: "+" },
    { type: TokenType.NUMBER, literal: "3.5" },
    { type: TokenType.RPAREN, literal: ")" },
  ]],
  ["DO", [{ type: TokenType.DO, literal: "DO" }]],
  ["PRINT", [{ type: TokenType.PRINT, literal: "PRINT" }]],
  ["INPUT", [{ type: TokenType.INPUT, literal: "INPUT" }]],
  // prettier-ignore
  ["PRINT 2", [{ type: TokenType.PRINT, literal: "PRINT" }, { type: TokenType.NUMBER, literal: "2" }]],
  // prettier-ignore
  ["INPUT X", [{ type: TokenType.INPUT, literal: "INPUT" }, { type: TokenType.IDENT, literal: "X" }]],
  [
    `
    CONST PI = 3.14
    VAR radius = 10
    VAR area = PI * radius * radius
    PRINT area
  `,
    [
      { type: TokenType.CONST, literal: "CONST" },
      { type: TokenType.IDENT, literal: "PI" },
      { type: TokenType.ASSIGN, literal: "=" },
      { type: TokenType.NUMBER, literal: "3.14" },
      { type: TokenType.VAR, literal: "VAR" },
      { type: TokenType.IDENT, literal: "radius" },
      { type: TokenType.ASSIGN, literal: "=" },
      { type: TokenType.NUMBER, literal: "10" },
      { type: TokenType.VAR, literal: "VAR" },
      { type: TokenType.IDENT, literal: "area" },
      { type: TokenType.ASSIGN, literal: "=" },
      { type: TokenType.IDENT, literal: "PI" },
      { type: TokenType.MUL, literal: "*" },
      { type: TokenType.IDENT, literal: "radius" },
      { type: TokenType.MUL, literal: "*" },
      { type: TokenType.IDENT, literal: "radius" },
      { type: TokenType.PRINT, literal: "PRINT" },
      { type: TokenType.IDENT, literal: "area" },
    ],
  ],
  // prettier-ignore
  ["X == 0 AND Y == 1", [
    { type: TokenType.IDENT, literal: "X" },
    { type: TokenType.EQ, literal: "==" },
    { type: TokenType.NUMBER, literal: "0" },
    { type: TokenType.AND, literal: "AND" },
    { type: TokenType.IDENT, literal: "Y" },
    { type: TokenType.EQ, literal: "==" },
    { type: TokenType.NUMBER, literal: "1" },
  ]],
  [
    `
    VAR x = 10
    VAR y = 20
    VAR z = x + y
    PRINT z

    VAR a = 100
    IF a > 10 AND a < 1000 THEN
      PRINT a
    ELSE
      PRINT 0
    ENDIF
    `,
    [
      { type: TokenType.VAR, literal: "VAR" },
      { type: TokenType.IDENT, literal: "x" },
      { type: TokenType.ASSIGN, literal: "=" },
      { type: TokenType.NUMBER, literal: "10" },
      { type: TokenType.VAR, literal: "VAR" },
      { type: TokenType.IDENT, literal: "y" },
      { type: TokenType.ASSIGN, literal: "=" },
      { type: TokenType.NUMBER, literal: "20" },
      { type: TokenType.VAR, literal: "VAR" },
      { type: TokenType.IDENT, literal: "z" },
      { type: TokenType.ASSIGN, literal: "=" },
      { type: TokenType.IDENT, literal: "x" },
      { type: TokenType.PLUS, literal: "+" },
      { type: TokenType.IDENT, literal: "y" },
      { type: TokenType.PRINT, literal: "PRINT" },
      { type: TokenType.IDENT, literal: "z" },
      { type: TokenType.VAR, literal: "VAR" },
      { type: TokenType.IDENT, literal: "a" },
      { type: TokenType.ASSIGN, literal: "=" },
      { type: TokenType.NUMBER, literal: "100" },
      { type: TokenType.IF, literal: "IF" },
      { type: TokenType.IDENT, literal: "a" },
      { type: TokenType.GT, literal: ">" },
      { type: TokenType.NUMBER, literal: "10" },
      { type: TokenType.AND, literal: "AND" },
      { type: TokenType.IDENT, literal: "a" },
      { type: TokenType.LT, literal: "<" },
      { type: TokenType.NUMBER, literal: "1000" },
      { type: TokenType.THEN, literal: "THEN" },
      { type: TokenType.PRINT, literal: "PRINT" },
      { type: TokenType.IDENT, literal: "a" },
      { type: TokenType.ELSE, literal: "ELSE" },
      { type: TokenType.PRINT, literal: "PRINT" },
      { type: TokenType.NUMBER, literal: "0" },
      { type: TokenType.ENDIF, literal: "ENDIF" },
    ],
  ],
  // prettier-ignore
  ["IF A > 10 THEN PRINT A ENDIF", [
    { type: TokenType.IF, literal: "IF" },
    { type: TokenType.IDENT, literal: "A" },
    { type: TokenType.GT, literal: ">" },
    { type: TokenType.NUMBER, literal: "10" },
    { type: TokenType.THEN, literal: "THEN" },
    { type: TokenType.PRINT, literal: "PRINT" },
    { type: TokenType.IDENT, literal: "A" },
    { type: TokenType.ENDIF, literal: "ENDIF" },
  ]],
  ["NULL", [{ type: TokenType.NULL, literal: "NULL" }]],
  ["TRUE", [{ type: TokenType.TRUE, literal: "TRUE" }]],
  ["FALSE", [{ type: TokenType.FALSE, literal: "FALSE" }]],
  ["FUNCTION", [{ type: TokenType.FUNCTION, literal: "FUNCTION" }]],
  ["ENDFUNCTION", [{ type: TokenType.ENDFUNCTION, literal: "ENDFUNCTION" }]],
  ["RETURN", [{ type: TokenType.RETURN, literal: "RETURN" }]],
  ["CALL", [{ type: TokenType.CALL, literal: "CALL" }]],
  // prettier-ignore
  ["FUNCTION add(a, b) RETURN a + b ENDFUNCTION", [
    { type: TokenType.FUNCTION, literal: "FUNCTION" },
    { type: TokenType.IDENT, literal: "add" },
    { type: TokenType.LPAREN, literal: "(" },
    { type: TokenType.IDENT, literal: "a" },
    { type: TokenType.COMMA, literal: "," },
    { type: TokenType.IDENT, literal: "b" },
    { type: TokenType.RPAREN, literal: ")" },
    { type: TokenType.RETURN, literal: "RETURN" },
    { type: TokenType.IDENT, literal: "a" },
    { type: TokenType.PLUS, literal: "+" },
    { type: TokenType.IDENT, literal: "b" },
    { type: TokenType.ENDFUNCTION, literal: "ENDFUNCTION" },
  ]],
])("lex('%s') should return the correct tokens %s", (source, expected) => {
  const lexer = new Lexer(source);
  const tokens = lexer.lex();

  tokens.forEach((token, index) => {
    expect(token).toStrictEqual(expect.objectContaining(expected[index]));
  });
});

type TokenWithPositionAndType = TokenPosition & { type: TokenType };

test.each<[string, TokenWithPositionAndType[]]>([
  // prettier-ignore
  ["VAR X = 1", [
  {type: TokenType.VAR, start: 0, end: 2},
  {type: TokenType.IDENT, start: 4, end: 4},
  {type: TokenType.ASSIGN, start: 6, end: 6},
  {type: TokenType.NUMBER, start: 8, end: 8},
]],
  // prettier-ignore
  [`FUNCTION add(a, b) RETURN a + b ENDFUNCTION`, [
    { type: TokenType.FUNCTION, start: 0, end: 7 },
    { type: TokenType.IDENT, start: 9, end: 11 },
    { type: TokenType.LPAREN, start: 12, end: 12 },
    { type: TokenType.IDENT, start: 13, end: 13 },
    { type: TokenType.COMMA, start: 14, end: 14 },
    { type: TokenType.IDENT, start: 16, end: 16 },
    { type: TokenType.RPAREN, start: 17, end: 17 },
    { type: TokenType.RETURN, start: 19, end: 24 },
    { type: TokenType.IDENT, start: 26, end: 26 },
    { type: TokenType.PLUS, start: 28, end: 28 },
    { type: TokenType.IDENT, start: 30, end: 30 },
    { type: TokenType.ENDFUNCTION, start: 32, end: 42 },
    ]],
])("lex('%s') should return the correct tokens %s", (source, expected) => {
  const lexer = new Lexer(source);
  const tokens = lexer.lex();

  tokens.forEach((token, index) => {
    expect(token).toStrictEqual(expect.objectContaining(expected[index]));
  });
});
