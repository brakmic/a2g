import { init } from './src/init/main';

init(process.argv).then(res => {
    if (res) {
        console.log('Operation succeeded.')
    } else {
        console.log('Operation failed.');
    }
});
