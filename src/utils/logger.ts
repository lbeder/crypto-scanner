/* eslint-disable no-console */
import chalk from "chalk";
import Table from "cli-table";

export class Logger {
  public static verbose: boolean;

  public static setVerbose(verbose: boolean) {
    this.verbose = verbose;
  }

  public static info(...args: unknown[]) {
    console.log(chalk.cyanBright(...args));
  }

  public static notice(...args: unknown[]) {
    console.log(chalk.greenBright(...args));
  }

  public static debug(...args: unknown[]) {
    if (!this.verbose) {
      return;
    }

    console.debug(chalk.yellow(...args));
  }

  public static warning(...args: unknown[]) {
    console.warn(chalk.hex("#FFA500")(...args));
  }

  public static error(...args: unknown[]) {
    console.log(chalk.bold.red(...args));
  }

  public static fatal(...args: unknown[]) {
    this.error(...args);

    process.exit(1);
  }

  public static table(table: Table) {
    console.log(table.toString());

    Logger.info();
  }

  public static br() {
    console.info();
    console.info(
      "****************************************************************************************************"
    );
    console.info();
  }

  public static description(...args: unknown[]) {
    console.log(chalk.magenta(...args));
  }

  public static title(title: string) {
    Logger.description(title);
    Logger.description("‾".repeat(title.length));
  }

  public static subtitle(title: string) {
    Logger.notice(title);
    Logger.notice("‾".repeat(title.length));
  }
}
