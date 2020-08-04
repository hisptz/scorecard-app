import { UserEffects } from './user.effects';
import { SystemInfoEffects } from './system-info.effects';
import { RouterEffects } from './router.effects';
import { ScorecardEffects } from './scorecard.effects';
import {ScorecardDataMigrationEffects} from './scorecard-data-migration.effects';

export const effects: any[] = [UserEffects, SystemInfoEffects, RouterEffects, ScorecardEffects, ScorecardDataMigrationEffects];
