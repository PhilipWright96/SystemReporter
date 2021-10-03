import { contextBridge } from 'electron';
import { cpus } from 'os';
import { execSync } from 'child_process';

const hostNameOutput = execSync('hostnamectl', { encoding: 'utf-8' });
contextBridge.exposeInMainWorld('api', {
  hostNameOutput,
  threads: cpus().length,
});
