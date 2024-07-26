import { BackgroundGradentProvider } from "@/components/gradient-provider";
import { StyledNotion } from "@/components/notion/styled";
import { ExternalLink, InfoIcon, Sparkle } from "lucide-react";
import { Footer } from "./Footer";
import { Connect } from "./Connect";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CardContainer, CardItem } from "@/components/ui/3d-card";
import { SparklesText } from "@/components/ui/sparkles-text";
import { AuroraBackground } from "@/components/ui/aurora-background";

export const revalidate = 100;

export default async function Page() {
  return (
    <main>
      <div className="container py-12 max-w-xl">
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
          <Dotfiles />
        </section>
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
      </div>
      <Footer />
      <AuroraBackground className="fixed h-screen w-screen -z-10 left-0 top-0" />
      <BackgroundGradentProvider className="h-screen -z-10 w-full opacity-30" />
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
      </div>
    </div>
  );
}

function Dotfiles() {
  return (
    <div className="mt-6 italic">
      <Project
        sparkle
        title="dotfiles"
        description={"arch+hyprland config, some things can run on mac too."}
        href="https://git.raj.how/raj/dotfiles.git"
      />
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
      <MainStory />
      <StyledNotion className="" blockId="d149cfb269aa4a5699bbf919a1b0b137" />
    </div>
  );
}

function MainStory() {
  return (
    <a
      href="https://tech.phonepe.com/nimbus-flexible-baremetal-provisioning/"
      target="_blank"
      className="mb-2 block"
    >
      <CardContainer containerClassName="p-0 rounded-sm">
        <div className="relative">
          <img
            className="rounded-sm overflow-hidden object-cover"
            src="https://tech.phonepe.com/static/97b8256c14389528acf5411b51d639e9/bc8e0/Nimbus-Flexible-BareMetal-Provisioning.png"
          />
          <div className="absolute z-10 bottom-0 left-0 w-full p-4 py-2 backdrop-blur backdrop-brightness-90">
            <CardItem translateZ="100" className="">
              <h1 className="text-white">
                Nimbus: Flexible BareMetal Provisioning
              </h1>
            </CardItem>
            <span className="text-xs text-white/80 italic">
              Surya Murugan, Nandan Herekar, Raj Sharma, Vishnu Naini
            </span>
          </div>
        </div>
      </CardContainer>
    </a>
  );
}

async function Projects() {
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
          title="PIOUS"
          description={
            "Custom Linux distribution for tracking and provisioning servers at scale."
          }
          href="https://tech.phonepe.com/heres-everything-you-need-to-know-about-phonepes-internal-cloud-provisioning-service/"
        />
        <Project
          contribution
          title="shadcn/ui"
          description={
            "Contributed to my Favorite UI library, shadcn/ui, with a single PR but it was fun."
          }
          href="https://ui.shadcn.com/"
        />
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
          description={
            "A Simpler & Easier to deploy OpenAI Assistants Alternative"
          }
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
  contribution,
  sparkle,
}: {
  title: string;
  description: JSX.Element | string;
  href?: string;
  sparkle?: boolean;
  contribution?: boolean;
}) {
  return (
    <div className="mt-4">
      <div className="flex items-center gap-1">
        {sparkle ? (
          <SparklesText sparklesCount={4} className="text-sm" text={title} />
        ) : (
          <h4 className="font-display font-medium text-sm">{title}</h4>
        )}
        {href ? (
          <a href={href} className="" target="_blank">
            <ExternalLink className="w-3" />
          </a>
        ) : null}
        {contribution ? (
          <Tooltip>
            <TooltipTrigger className="flex ml-1 gap-1 items-center">
              <span className="text-xs opacity-70 italic">
                OSS Contribution
              </span>
              <InfoIcon size={12} />
            </TooltipTrigger>

            <TooltipContent>
              This is a contribution to an existing project. The project was not
              started by me.
            </TooltipContent>
          </Tooltip>
        ) : null}
      </div>
      <p className="text-xs text-foreground/80 text-balance">{description}</p>
    </div>
  );
}
