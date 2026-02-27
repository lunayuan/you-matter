import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Share2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import ExampleBoard from "@/components/ExampleBoard";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0, 0, 0.2, 1] as const },
  }),
};

const steps = [
  {
    icon: Heart,
    title: "Create a board for someone",
    description: "Start a farewell board in seconds — no account needed.",
  },
  {
    icon: Share2,
    title: "Share the link with colleagues",
    description: "Send it via WhatsApp, personal email, or text — anywhere outside company systems.",
  },
  {
    icon: Mail,
    title: "They receive messages that remind them: they mattered",
    description: "A keepsake page of heartfelt notes from the people they worked with.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-warm-blush/60 to-background" />
        <div className="relative mx-auto max-w-3xl px-6 pb-16 pt-24 text-center md:pt-32 md:pb-24">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-4 text-sm font-medium uppercase tracking-widest text-primary"
          >
            You Matter
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl font-semibold leading-tight text-foreground md:text-5xl lg:text-6xl"
          >
            When someone is leaving, the connections don't have to.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground md:text-xl"
          >
            Create a board where colleagues can share what someone truly meant to them — as a person, not just an employee.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10"
          >
            <Button asChild size="lg" className="rounded-full px-8 text-base font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow">
              <Link to="/create">Create a Board</Link>
            </Button>
          </motion.div>
        </div>
      </header>

      {/* How it works */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          custom={0}
          className="text-center font-serif text-3xl font-semibold text-foreground md:text-4xl"
        >
          How it works
        </motion.h2>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              variants={fadeUp}
              custom={i + 1}
              className="flex flex-col items-center rounded-2xl bg-card p-8 text-center shadow-sm"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-warm-blush">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Example board preview */}
      <section className="bg-warm-cream/50 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            custom={0}
            className="text-center font-serif text-3xl font-semibold text-foreground md:text-4xl"
          >
            A board is a keepsake
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            custom={1}
            className="mx-auto mt-4 max-w-lg text-center text-muted-foreground"
          >
            Here's what it looks like when colleagues share what someone meant to them.
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            variants={fadeUp}
            custom={2}
            className="mt-12"
          >
            <ExampleBoard />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center">
        <p className="text-sm text-muted-foreground">
          Built with ❤️ for the people who matter
        </p>
        <Link
          to="/create"
          className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
        >
          Create a Board
        </Link>
      </footer>
    </div>
  );
};

export default Index;
