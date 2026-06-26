// Pure helpers for the tracker board. No React.

import { STAGES, type Application, type Stage } from '~/shared/jobs'

export function applicationsInStage(
  applications: Application[],
  stage: Stage,
): Application[] {
  return applications.filter((a) => a.stage === stage)
}

/** The stage one step earlier/later, or null at the ends of the pipeline. */
export function adjacentStage(stage: Stage, dir: -1 | 1): Stage | null {
  const next = STAGES[STAGES.indexOf(stage) + dir]
  return next ?? null
}
