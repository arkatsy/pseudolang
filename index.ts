import { Command } from "commander";
import Lexer from "./lexer/lexer";
import fs from "node:fs";
import repl from "node:repl";
import chalk from "chalk";

const VERSION = "0.1.0";
const log = console.log;

const program = new Command();

program
  .version(`Pseudolang ${VERSION}`, "-v, --version", "Output the current version")
  .arguments("[source]")
  .option("-i, --inline", "The argument is the source code itself, else it's considered a file path")
  .option("-d, --debug", "Print debug information");

program.parse(process.argv);

const options = program.opts();
const args = program.args;

const shouldREPL = args.length === 0;

if (shouldREPL) {
  handleREPL();
} else {
  const isInline = options.inline ? true : false;
  let source: string | null = null;
  if (isInline) {
    source = args[0];
  } else {
    try {
      source = fs.readFileSync(args[0], "utf-8");
    } catch (e) {
      console.error(
        chalk.redBright(`[CLI] [ERROR]`),
        `\nError while reading the provided file. \nPlease check if the file exists and the path is correct. If you are trying to pass the source code directly, use the "-i", "--inline" flag. \nExample: ${chalk.greenBright(
          'pseudolang -i "VAR X = 1"'
        )}`
      );

      process.exit(1);
    }
  }

  const debug = options.debug ? true : false;

  const lexer = new Lexer(source, debug);
  const tokens = lexer.lex();
  console.log(tokens);
}

function handleREPL() {
  log(`Welcome to Pseudolang v${VERSION}`);
  log(`Type .help for more information`);
  const replServer = repl.start({
    prompt: ">> ",
    eval: (cmd, context, filename, callback) => {
      const source = cmd.trim().replace(/;$/, "");
      const lexer = new Lexer(source);
      const tokens = lexer.lex();

      callback(null, tokens);
    },
  });
}
