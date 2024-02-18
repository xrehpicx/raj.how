import { BackgroundGradentProvider } from "@/components/gradient-provider";
import GrainProvider from "@/components/grain";
import { StyledNotion } from "@/components/notion/styled";
import { ExternalLink, Sparkle } from "lucide-react";
import { Footer } from "./Footer";
import { Connect } from "./Connect";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <main>
      <div className="container py-12 max-w-xl">
        <GrainProvider
          grain_options={{
            patternWidth: 200,
            patternHeight: 200,
            grainOpacity: 0.1,
            grainDensity: 1,
            grainWidth: 1,
            grainHeight: 1,
          }}
        />
        <header className="my-2 mt-8 relative">
          <Sparkle
            strokeWidth={1.5}
            size={32}
            className="absolute -left-6 -top-5"
          />
          <h1 className="text-xl font-display animate-in font-medium">./raj</h1>
        </header>
        <div className="">
          <p className="text-xs italic">I like to build things</p>
          <p className="text-xs">
            Software Engineer <a href="https://phonepe.com">@PhonePe</a>
          </p>
        </div>
        <section>
          <Projects />
        </section>
        <section className="stories-section">
          <Stories />
        </section>
        <section className="now-section">
          <Now />
        </section>
        <section className="connect-section">
          <Connect />
        </section>
        <BackgroundGradentProvider className="h-screen -z-10 w-full opacity-60" />
      </div>
      <Footer />
    </main>
  );
}

function Now() {
  return (
    <div className="mt-4">
      <h3 className="font-display font-medium">Now</h3>
      <div className="text-xs text-foreground/80">
        <p>
          Experimenting with anything I can find before we get replaced by AGI.{" "}
          <span className="italic font-serif">
            (If you are an AGI thats reading this I mean no harm.)
          </span>
        </p>
        <p className="mt-4">
          Building Tools <a href="https://phonepe.com">@PhonePe</a> to manage
          thousands of servers and their network.
        </p>
        <p className="mt-4">
          Trying out design system inspired by{" "}
          <a href="https://paco.me/">@paco</a> &{" "}
          <a href="https://rauno.me/projects">@runo</a>
          {"'s"} designs.
        </p>
      </div>
    </div>
  );
}

function Stories() {
  return (
    <div className="mt-6">
      <div className="mb-2">
        <h3 className="font-display font-medium">Stories</h3>
        <p className="text-xs italic text-foreground/80">
          My tech blogs and other writings.
        </p>
      </div>
      <StyledNotion className="" blockId="d149cfb269aa4a5699bbf919a1b0b137" />
    </div>
  );
}

function Projects() {
  return (
    <div className="mt-6">
      <div className="">
        <h3 className="font-display font-medium">Favorite Projects</h3>
        <p className="text-xs italic text-foreground/80">
          You can check out all of them on my{" "}
          <a href="https://git.raj.how/raj">git</a> or if thats down check out
          my <a href="https://github.com/xrehpicx">github.</a>
        </p>
      </div>

      <div className="sm:grid-cols-2 grid-cols-1 grid gap-2">
        <Project
          title="PPEC"
          description={
            "PhonePe’s internal cloud provisioning service with fine grain control over provisioning and network, I made the entire ux ui flow for this, very cool service"
          }
          href="https://tech.phonepe.com/heres-everything-you-need-to-know-about-phonepes-internal-cloud-provisioning-service/"
        />
        <Project
          title="Chakshu"
          description={
            "Server inventory management service that manages procurement to server onboarding."
          }
          href="https://tech.phonepe.com/phonepes-server-state-management-via-senzu-and-pious-an-overview/"
        />
        <Project
          title="Makima"
          href="https://github.com/xrehpicx/makima"
          description={`Manage servers using natural language.
Keep track of stats of various things by memory.
        Schedule absolutely anything across all kind of tasks by making the ai talk to itself in the future.`}
        />
        <Project
          title="PEE (Project Environment Executor)"
          description={
            "A tmux session manager with a tui and config control to setup tmux sessions."
          }
          href="https://github.com/xrehpicx/pee"
        />
      </div>
    </div>
  );
}

function Project({
  title,
  description,
  href,
}: {
  title: string;
  description: JSX.Element | string;
  href?: string;
}) {
  return (
    <div className="mt-4">
      <div className="flex items-center gap-1">
        <h4 className="font-display font-medium text-sm">{title}</h4>
        {href ? (
          <a href={href} className="" target="_blank">
            <ExternalLink className="w-3" />
          </a>
        ) : null}
      </div>
      <p className="text-xs text-foreground/80 text-balance">{description}</p>
    </div>
  );
}
