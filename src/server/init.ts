import { migrate } from './migrate';
import { seedIfEmpty } from './seed';

migrate();
seedIfEmpty();

console.log('DB ready ✅');
