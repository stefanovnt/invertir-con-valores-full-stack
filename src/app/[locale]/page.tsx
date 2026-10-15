import { Ant, Bee, Kangaroo, Turtle } from "@/components/animals";

export default function Home() {
  return (
    <section className="container flex flex-wrap gap-10 pt-32">
      <Ant className="h-40 w-40" />
      <Turtle className="h-40 w-40" />
      <Bee className="h-40 w-40" />
      <Kangaroo className="h-40 w-40" />
    </section>
  );
}
