import * as migration_20260501_054903 from './20260501_054903';
import * as migration_20260501_063803 from './20260501_063803';
import * as migration_20260501_122538 from './20260501_122538';
import * as migration_20260501_125629 from './20260501_125629';

export const migrations = [
  {
    up: migration_20260501_054903.up,
    down: migration_20260501_054903.down,
    name: '20260501_054903',
  },
  {
    up: migration_20260501_063803.up,
    down: migration_20260501_063803.down,
    name: '20260501_063803',
  },
  {
    up: migration_20260501_122538.up,
    down: migration_20260501_122538.down,
    name: '20260501_122538',
  },
  {
    up: migration_20260501_125629.up,
    down: migration_20260501_125629.down,
    name: '20260501_125629'
  },
];
