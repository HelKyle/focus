import { v4 } from 'uuid';

export const GEN_TASK = name => ({
  name,
  id: v4(),
  created_at: +new Date(),
  plan: 25 * 60,
  remain: 25 * 60,
  done: false
});
