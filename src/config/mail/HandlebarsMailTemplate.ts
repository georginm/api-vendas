import fs from 'fs';
import handlebars from 'handlebars';

import { IParseMailTemplate } from './IParseMailTemplate';

class HandleBarsMailTemplate {
  public async parse({ file, variables }: IParseMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}

export { HandleBarsMailTemplate };
