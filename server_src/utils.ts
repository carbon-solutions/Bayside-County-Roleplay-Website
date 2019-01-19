import {spawn} from 'child_process';
import * as path from 'path';

export default {
	RCON_CMD_BASE: path.join(__dirname, '..', 'tools', 'rcon') + ' 54.37.128.15 30120 ameryczkarp ',
	SERVER_CMDS: {
		'start': '/home/in2rp/start.sh',
		'stop': '/home/in2rp/stop.sh',
		'restart': '/home/in2rp/restart.sh'
	},
	executeCommand: function(cmd: string): Promise<string> {
		return new Promise((resolve, reject) => {
			var stdout = '';
			var stderr = '';

			try {
				let args = cmd.split(' ');
				let main_cmd = args.shift() || 'echo';
				const command = spawn(main_cmd, args);
				command.stdout.on('data', (data: string) => stdout += data);
				command.stderr.on('data', (data: string) => stderr += data);
				command.on('close', (code: number) => {
				  	if(code === 0)
				  		resolve(stdout);
				  	else
				  		reject(stderr);
				});
				command.on('error', (err: any) => {
				  	reject(err);
				});
			}
			catch(e) {
				reject(e);
			}
		});
	},
	executeRconCommand: function(cmd: string): Promise<string> {
		return this.executeCommand(this.RCON_CMD_BASE + cmd);
	}
};