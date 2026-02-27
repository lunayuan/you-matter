import { useState } from "react";
import { X, PenLine, MessageSquareText, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import { addMessage } from "../lib/board-store";
import "../styles/components/add-message-modal.css";

interface Props {
  boardId: string;
  onClose: () => void;
  onSaved: () => void;
}

const GUIDED_PROMPTS = [
  "What is a favourite memory you share with them?",
  "What quality do you admire most about them?",
  "What will you miss the most?",
];

type Mode = "choose" | "freewrite" | "guided";

export default function AddMessageModal({ boardId, onClose, onSaved }: Props) {
  const [mode, setMode] = useState<Mode>("choose");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(["", "", ""]);
  const [freeText, setFreeText] = useState("");
  const [author, setAuthor] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async (content: string) => {
    if (!content.trim() || !author.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSaving(true);
    try {
      await addMessage({ board_id: boardId, author, content });
      toast.success("Message added!");
      onSaved();
      onClose();
    } catch {
      toast.error("Could not save. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        {mode === "choose" && (
          <div className="choose-mode">
            <h2>Add a Message</h2>
            <p>How would you like to write your note?</p>
            <div className="choose-buttons">
              <button
                className="choose-btn card"
                onClick={() => setMode("freewrite")}
              >
                <PenLine size={24} />
                <span>Freewrite</span>
                <small>Write whatever comes to heart</small>
              </button>
              <button
                className="choose-btn card"
                onClick={() => setMode("guided")}
              >
                <Lightbulb size={24} />
                <span>Guided</span>
                <small>Answer a few prompts</small>
              </button>
            </div>
          </div>
        )}

        {mode === "freewrite" && (
          <div className="freewrite-mode">
            <h2>
              <MessageSquareText size={20} /> Write Your Message
            </h2>
            <textarea
              className="textarea"
              placeholder="Share what this person meant to you…"
              value={freeText}
              onChange={(e) => setFreeText(e.target.value)}
            />
            <input
              className="input"
              placeholder="Your name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <button
              className="btn btn-primary"
              disabled={saving}
              onClick={() => submit(freeText)}
            >
              {saving ? "Sending…" : "Send Message"}
            </button>
          </div>
        )}

        {mode === "guided" && (
          <div className="guided-mode">
            <h2>
              <Lightbulb size={20} /> Guided Message
            </h2>

            <div className="guided-progress">
              {GUIDED_PROMPTS.map((_, i) => (
                <span
                  key={i}
                  className={`dot ${i === step ? "active" : ""} ${
                    i < step ? "done" : ""
                  }`}
                />
              ))}
            </div>

            <p className="guided-prompt">{GUIDED_PROMPTS[step]}</p>
            <textarea
              className="textarea"
              value={answers[step]}
              onChange={(e) => {
                const next = [...answers];
                next[step] = e.target.value;
                setAnswers(next);
              }}
            />

            <div className="guided-nav">
              {step > 0 && (
                <button
                  className="btn btn-outline"
                  onClick={() => setStep(step - 1)}
                >
                  Back
                </button>
              )}
              {step < GUIDED_PROMPTS.length - 1 ? (
                <button
                  className="btn btn-primary"
                  onClick={() => setStep(step + 1)}
                >
                  Next
                </button>
              ) : (
                <>
                  <input
                    className="input"
                    placeholder="Your name"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                  <button
                    className="btn btn-primary"
                    disabled={saving}
                    onClick={() =>
                      submit(
                        answers
                          .filter(Boolean)
                          .map((a, i) => `${GUIDED_PROMPTS[i]}\n${a}`)
                          .join("\n\n")
                      )
                    }
                  >
                    {saving ? "Sending…" : "Send Message"}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
