import upload from '@config/upload';
import fs from 'fs';
import path from 'path';

import { IStorageProvider } from '../IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(upload.tmpFolder, file),
      path.resolve(upload.directory, file)
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(upload.directory, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      // eslint-disable-next-line no-useless-return
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export { DiskStorageProvider };
