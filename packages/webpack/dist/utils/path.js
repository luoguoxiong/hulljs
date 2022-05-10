import { fileURLToPath } from 'url';
import { dirname } from 'path';
export const getPath = (pathStr) => {
    const filename = fileURLToPath(pathStr);
    return {
        filename,
        dirname: dirname(filename),
    };
};
//# sourceMappingURL=path.js.map