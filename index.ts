/// <reference path="typings/globals/node/index.d.ts" />
import { init } from './src/init/main';

init(process.argv).then(res => {
    console.log(`FINAL RESULT: ${res}`);
});
