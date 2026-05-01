import * as migration_20260501_054903 from './20260501_054903';
import * as migration_20260501_063803 from './20260501_063803';

export const migrations = [
  {
    up: migration_20260501_054903.up,
    down: migration_20260501_054903.down,
    name: '20260501_054903',
  },
  {
    up: migration_20260501_063803.up,
    down: migration_20260501_063803.down,
    name: '20260501_063803'
  },
];
