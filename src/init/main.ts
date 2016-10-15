import { XGen } from '../a2g';

export function init(args: string[]): Promise<boolean> {
    const a2g = new XGen(args);
    return a2g.execute();
};
