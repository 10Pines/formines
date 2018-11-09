#!/usr/bin/env node

const child_process = require("child_process");
const path = require("path");
const findUp = require("find-up");

async function getLernaJson() {
    return require(await findUp('lerna.json'));
}

async function getPkgJson() {
    return require(path.join(process.cwd(), '/package.json'));
}

async function main() {
    const pkg = await getPkgJson();
    const lerna = await getLernaJson();

    if (pkg.version !== lerna.version) {
        console.log("Ignoring package since it wasn't updated in the last version")
        return;
    }

    child_process.execSync('npm publish')
}

main();