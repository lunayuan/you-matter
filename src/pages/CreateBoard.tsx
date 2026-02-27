import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Camera } from "lucide-react";
import { toast } from "sonner";
import { createBoard } from "../lib/board-store";
import "../styles/pages/create-board.css";

export default function CreateBoard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    recipient_name: "",
    recipient_photo: "",
    dedication: "",
    created_by: "",
  });

  const set = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.recipient_name.trim() || !form.created_by.trim()) {
      toast.error("Please fill in the required fields.");
      return;
    }
    setLoading(true);
    try {
      const slug = await createBoard(form);
      navigate(`/board/${slug}/success`);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-page">
      <div className="container">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} /> Back
        </Link>

        <div className="create-card card">
          <h1>Create a Farewell Board</h1>
          <p className="create-subtitle">
            Set up a board so the team can share kind words.
          </p>

          <form onSubmit={handleSubmit} className="create-form">
            {/* Photo (optional) */}
            <div className="photo-upload">
              <label className="photo-circle" htmlFor="photo-url">
                {form.recipient_photo ? (
                  <img src={form.recipient_photo} alt="" />
                ) : (
                  <Camera size={28} />
                )}
              </label>
              <input
                id="photo-url"
                className="input"
                placeholder="Paste a photo URL (optional)"
                value={form.recipient_photo}
                onChange={(e) => set("recipient_photo", e.target.value)}
              />
            </div>

            <label className="field">
              <span>
                Recipient name <span className="required">*</span>
              </span>
              <input
                className="input"
                placeholder="e.g. Sarah Chen"
                value={form.recipient_name}
                onChange={(e) => set("recipient_name", e.target.value)}
              />
            </label>

            <label className="field">
              <span>Dedication (optional)</span>
              <textarea
                className="textarea"
                placeholder="A short farewell note from you…"
                value={form.dedication}
                onChange={(e) => set("dedication", e.target.value)}
              />
            </label>

            <label className="field">
              <span>
                Your name <span className="required">*</span>
              </span>
              <input
                className="input"
                placeholder="Who is creating this board?"
                value={form.created_by}
                onChange={(e) => set("created_by", e.target.value)}
              />
            </label>

            <button
              type="submit"
              className="btn btn-primary submit-btn"
              disabled={loading}
            >
              {loading ? "Creating…" : "Create Board"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
