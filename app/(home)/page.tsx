import { Logo } from "@/components/Logo";
import { Card, Cards } from "fumadocs-ui/components/card";
import { CircleDotDashed, Gauge, Sliders, Zap } from "lucide-react";
import Link from "next/link";

const sections = [
  ["Building and Running", "How to build and run the project.", Zap, "/docs/#building-and-running"],
  ["Configuring Editors", "How to configure your editor for Ladybird.", Sliders, "/docs/#configuring-editors"],
  ["Development", "How to develop Ladybird.", CircleDotDashed, "/docs/#development"],
  ["Browser/LibWeb", "How to use the browser and libweb.", Gauge, "/docs/#browserlibweb"],
] as const;

export default function HomePage() {
  return (
    <main className="w-full min-w-0 max-w-6xl px-8 pt-4 pb-12 md:px-12 mx-auto relative">
      <Grid />
      <Logo />
      <article className="prose max-w-none">
        <p className="text-center">
          Developer documentation and resources for the Ladybird Browser project.
          <br />
        </p>
        <h2>Sections</h2>
        <Cards className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {sections.map(([title, description, Icon, link]) => (
            <Link key={title} href={link} className="no-underline">
              <Card
                className="min-h-[150px]"
                description={description}
                icon={<Icon />}
                title={title}
              />
            </Link>
          ))}
        </Cards>
      </article>
    </main>
  );
}

const Grid = () => (
  <div
    className="absolute inset-0 opacity-10 md:max-w-[80vw] max-h-96 mx-auto"
    style={{
      backgroundImage: "linear-gradient(var(--color-blue-500) 2px, transparent 1px), linear-gradient(to right, var(--color-blue-500) 2px, transparent 2px)",
      backgroundSize: "20px 20px",
    }}
  >
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: "radial-gradient(circle, transparent 60%, var(--color-fd-background) 100%)",
      }}
    ></div>

  </div>
);