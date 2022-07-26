import * as dotenv from 'dotenv';
import path from 'path';

interface MiniappInfo {
  // 小程序的appid
  appid: string;
  // 上传私钥的路径
  privateKeyPath: string;
}

export function parseEnv(): MiniappInfo {
  const cwd = process.cwd();

  const dotenvResult = dotenv.config({
    path: path.join(cwd, './.env'),
  });

  if (dotenvResult.error) {
    throw dotenvResult.error;
  }

  const parsed = dotenvResult.parsed;

  // 取出用到的key
  const { appid = '', privateKeyPath = '' } = parsed || {};

  if (!appid) {
    throw new Error('.env文件中未配置"appid"属性');
  }

  if (!privateKeyPath) {
    throw new Error('.env文件中未配置"privateKeyPath"属性');
  }

  return {
    appid,
    privateKeyPath,
  }
}
