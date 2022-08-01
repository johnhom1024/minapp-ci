import { program } from 'commander';
import MpUpload from './util/index';

program
  .command('upload')
  .description('上传当前小程序代码')
  .action(() => {
    MpUpload();
  })

program
  .version('0.0.2', '-v --version')
  .usage('minapp <command> [option]');

program.parse(process.argv);