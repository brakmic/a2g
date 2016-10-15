import { init } from './src/init/main';

init(process.argv).then(res => {
    console.log(res);
});
