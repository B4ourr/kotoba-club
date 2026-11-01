import { copyFileSync, mkdirSync } from 'node:fs';

mkdirSync('dist/.openai/drizzle/meta', { recursive: true });
copyFileSync('.openai/hosting.json', 'dist/.openai/hosting.json');
copyFileSync('migrations/0001_init.sql', 'dist/.openai/drizzle/0000_init.sql');
copyFileSync('drizzle/meta/_journal.json', 'dist/.openai/drizzle/meta/_journal.json');
