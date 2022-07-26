import { Project, upload as cliUpload } from 'miniprogram-ci';
import dayjs from 'dayjs';
import { parseEnv } from './parseEnv';

function genVersion() {
  const version = dayjs().format('YYYYMMDDHHmm');
  return version;
}


async function upload(params: { appid:string, privateKeyPath: string, version: string, desc: string }) {
  const projectPath = process.cwd();

  const { appid, privateKeyPath, version, desc } = params;

  const project = new Project({
    appid,
    type: 'miniProgram',
    projectPath,
    privateKeyPath,
  })

  return await cliUpload({
    project,
    version,
    desc,
    onProgressUpdate() { /* nothing */ }
  })
}



function MpUpload(options: {  }) {
  // 拿到appid和privateKeyPath
  const { appid, privateKeyPath } = parseEnv();
  
}
