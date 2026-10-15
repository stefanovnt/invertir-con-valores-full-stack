import { Ant } from "./Ant";
import { Bee } from "./Bee";
import { Kangaroo } from "./Kangaroo";
import { Turtle } from "./Turtle";

export { Ant, Bee, Kangaroo, Turtle };
export type { AnimalProps } from "./shared";

/** Lookup used by data-driven sections (steps, blog covers). */
export const animals = {
  ant: Ant,
  turtle: Turtle,
  bee: Bee,
  kangaroo: Kangaroo,
} as const;
export type AnimalName = keyof typeof animals;
export const isAnimal = (v: string): v is AnimalName => v in animals;
