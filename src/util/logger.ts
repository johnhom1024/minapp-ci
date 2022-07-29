import chalk from 'chalk';

export function log(...args: any) {
  console.log(...args);
}

export function logInfo(msg: string) {
  console.log(
    chalk.bgBlue.black(' Info ') + ' ' +
    msg
  );
}

export function logSuccess(msg: string) {
  console.log(
    chalk.bgGreen.black(' Success ') + ' ' +
    msg
  );
}

export function logWarn(msg: string, logBlock = false) {
  if (logBlock) log('\n\n');

  console.log(
    chalk.bgYellow.black(' Warn ') + ' ' +
    chalk.yellow(msg)
  );

  if (logBlock) log('\n\n');
}

export function logError(msg: string | Error) {
  console.error(
    chalk.bgRed(' Error ') + ' ' +
    chalk.red(msg instanceof Error ? msg.message : msg)
  );

  if (msg instanceof Error) {
    console.error(msg.stack);
  }
}