import { CheckSquare, Code2, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoopStep {
  step: number
  title: string
  description: string
  icon: React.ReactNode
}

const steps: LoopStep[] = [
  {
    step: 1,
    title: "Accept Quests",
    description:
      "Choose from a library of real-world coding challenges. From fixing bugs in open source repos to building full-stack apps.",
    icon: <CheckSquare className="w-6 h-6 text-primary" />,
  },
  {
    step: 2,
    title: "Grind XP",
    description:
      "Write code in your favorite IDE. Push commits to GitHub. We automatically verify your work and award XP instantly.",
    icon: <Code2 className="w-6 h-6 text-primary" />,
  },
  {
    step: 3,
    title: "Unlock Loot",
    description:
      "Level up to unlock profile badges, exclusive skins, and access to private job boards with top tech companies.",
    icon: <Trophy className="w-6 h-6 text-primary" />,
  },
]

function LoopStepCard({ step, title, description, icon }: LoopStep) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 text-center hover:border-primary/30 transition-colors">
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-foreground mb-2">
        {step}. {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}

export function CoreLoopSection() {
  return (
    <section className="py-16 lg:py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">
            THE CORE LOOP
          </h2>
          <div className="w-10 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => (
            <LoopStepCard key={step.step} {...step} />
          ))}
        </div>
      </div>
    </section>
  )
}
