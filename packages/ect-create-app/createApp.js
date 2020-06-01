const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const commander = require('commander');
const packageJson = require('./package.json');
let projectName;
const program = new commander.Command(packageJson.name)
	.version(packageJson.version, '-V, --version')
	.action(name => {
		projectName = name;
	})
	.option(
		'--template <path-to-template>',
		'specify a template for the created project'
	)
	.parse(process.argv);

CreateApp(projectName);

function CreateApp (name) {

	const root = path.resolve(name);
	const appName = path.basename(root);

	fs.ensureDirSync(projectName);

	const packageJson = {
		name: appName,
		version: '1.0.0',
		private: true,
	};
	fs.writeFileSync(
		path.join(root, 'package.json'),
		JSON.stringify(packageJson, null, 2)
	);

}