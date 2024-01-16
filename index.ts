import Tokens from "tokens/tokens";
import { Command } from "commander";
import chalk from "chalk";

const log = console.log;

const program = new Command();
program.version("0.0.0");

program.option("-st, --show-tokens", "Show tokens").parse(process.argv);

const options = program.opts();

for (const option in options) {
  switch (option) {
    case "showTokens": {
      log(chalk.yellow(Object.keys(Tokens).join("\n")));
    }
  }
}
