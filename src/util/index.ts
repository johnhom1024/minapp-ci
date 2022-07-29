import { Project, upload as cliUpload } from 'miniprogram-ci';
import dayjs from 'dayjs';
import path from 'path';
import { parseEnv } from './parseEnv';
import { logError, logSuccess } from './logger';
import chalk from 'chalk';

function genVersion() {
  const version = dayjs().format('YYYYMMDDHHmm');
  return version;
}

/**
 * @description: 上传小程序代码
 * @param {number} robot 指定使用哪一个 ci 机器人，可选值：1 ~ 30
 * @return {*}
 */
async function upload(params: {
  appid: string;
  privateKeyPath: string;
  version: string;
  desc: string;
  robot?: number;
}) {
  const projectPath = process.cwd();
  
  const { appid, privateKeyPath, version, desc, robot } = params;

  const project = new Project({
    appid,
    type: 'miniProgram',
    projectPath,
    privateKeyPath,
  });

  return await cliUpload({
    project,
    version,
    desc,
    robot,
    onProgressUpdate() {
      /* nothing */
    },
  });
}

interface Config {
  ver?: string;
  desc?: string;
}

export async function MpUpload(options?: Partial<Config>) {
  const context = process.cwd();
  // 拿到appid和privateKeyPath
  const { appid, privateKeyPath } = parseEnv();
  const { desc = '', ver = '' } = options || {};

  // 对privateKeyPath生成一个绝对路径
  const privateKeyAbsolutePath = path.resolve(context, privateKeyPath);

  const version = ver || genVersion();

  try {
    const { subPackageInfo } = await upload({
      appid,
      privateKeyPath: privateKeyAbsolutePath,
      version,
      desc,
    });

    logSuccess(`${chalk.yellow(appid)} upload complete`);

    console.log(subPackageInfo);
  } catch (error: unknown) {
    if (error instanceof Error) {
      logError(error);
    }
  }
}

export default MpUpload;
