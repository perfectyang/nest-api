import { user } from './user';
import { project } from './project';
import { language } from './language';
import { translate } from './translate';

export * from './user';
export * from './project';

export const schemas = {
  user,
  project,
  language,
  translate,
};
