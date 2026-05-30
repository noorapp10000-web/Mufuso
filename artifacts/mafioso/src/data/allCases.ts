import { CASES, type Case } from "./cases";
import { CASES_5P } from "./cases5p";
import { CASES_6P } from "./cases6p";

export const ALL_CASES: Case[] = [...CASES, ...CASES_5P, ...CASES_6P];

export function getCaseById(id: string): Case | undefined {
  return ALL_CASES.find(c => c.id === id);
}

export { CASES_5P, CASES_6P };
