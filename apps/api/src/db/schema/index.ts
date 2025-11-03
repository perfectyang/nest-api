import { users } from './users';
import { course_type } from './course_type';
import { course_class } from './course_class';

export * from './users';
export * from './course_type';
export * from './course_class';

export const schemas = {
  users,
  course_type,
  course_class,
};
