import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-16 lg:py-24 px-4 border-t border-border">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl lg:text-4xl font-bold text-foreground mb-4 text-balance">
          Ready to Start Your Quest?
        </h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Join 50,000+ developers leveling up their careers through gamified
          learning. {"It's"} free to start.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:flex-1 px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Email address"
          />
          <button className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors whitespace-nowrap">
            Join Waitlist
          </button>
        </div>
      </div>
    </section>
  )
}

export function SiteFooter() {
  const footerLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "GitHub Repo", href: "#" },
    { label: "Twitter", href: "#" },
  ]

  return (
    <footer className="border-t border-border py-8 px-4">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-4">
        <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          &copy; 2025 Level-Up Platform. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
