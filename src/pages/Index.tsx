import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Users, Send, Sparkles } from "lucide-react";
import ExampleBoard from "../components/ExampleBoard";
import "../styles/pages/index.css";

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5 },
  }),
};

export default function Index() {
  return (
    <div className="index-page">
      {/* ── Hero ── */}
      <section className="hero">
        <div className="container hero-inner">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Because Every Person <span className="highlight">Matters</span>
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Create a farewell board where colleagues share what someone truly
            meant to them.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/create" className="btn btn-primary">
              <Heart size={18} /> Create a Board
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps">
            {[
              {
                icon: <Sparkles size={28} />,
                title: "Create a Board",
                desc: "Enter their name and a short dedication.",
              },
              {
                icon: <Send size={28} />,
                title: "Share the Link",
                desc: "Send the board link to the team.",
              },
              {
                icon: <Users size={28} />,
                title: "Collect Messages",
                desc: "Everyone adds a heartfelt note.",
              },
              {
                icon: <Heart size={28} />,
                title: "Gift the Board",
                desc: "Present it on their last day.",
              },
            ].map((step, i) => (
              <motion.div
                className="step-card card"
                key={i}
                custom={i}
                variants={fade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Example ── */}
      <section className="example-section">
        <div className="container">
          <h2 className="section-title">See an Example</h2>
          <ExampleBoard />
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="container footer-inner">
          <p>
            Made with <Heart size={14} className="heart-icon" /> by You Matter
          </p>
          <p className="credit">Design inspired by Lovable</p>
        </div>
      </footer>
    </div>
  );
}
