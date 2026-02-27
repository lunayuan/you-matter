import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Plus, Share2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  getBoardBySlug,
  getMessagesForBoard,
  Board,
  Message,
} from "../lib/board-store";
import AddMessageModal from "../components/AddMessageModal";
import "../styles/pages/board-page.css";

export default function BoardPage() {
  const { slug } = useParams<{ slug: string }>();
  const [board, setBoard] = useState<Board | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const load = async () => {
    if (!slug) return;
    const b = await getBoardBySlug(slug);
    if (!b) {
      setLoading(false);
      return;
    }
    setBoard(b);
    const msgs = await getMessagesForBoard(b.id);
    setMessages(msgs);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [slug]);

  const share = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    toast.success("Board link copied!");
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
      </div>
    );
  }

  if (!board) {
    return (
      <div className="board-empty container">
        <h2>Board not found</h2>
        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="board-page">
      <div className="container">
        <div className="board-header">
          <Link to="/" className="back-link">
            <ArrowLeft size={18} /> Home
          </Link>
          <button className="btn btn-outline" onClick={share}>
            <Share2 size={16} /> Share
          </button>
        </div>

        <div className="board-hero">
          {board.recipient_photo && (
            <img
              src={board.recipient_photo}
              alt={board.recipient_name}
              className="board-avatar"
            />
          )}
          <h1>{board.recipient_name}</h1>
          {board.dedication && (
            <p className="board-dedication">{board.dedication}</p>
          )}
        </div>

        {messages.length === 0 ? (
          <div className="board-no-messages">
            <p>No messages yet. Be the first to share kind words!</p>
          </div>
        ) : (
          <div className="messages-grid">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  className="message-card"
                  style={{ background: msg.color }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="message-text">{msg.content}</p>
                  <span className="message-author">— {msg.author}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* FAB */}
        <button
          className="fab"
          onClick={() => setShowModal(true)}
          aria-label="Add message"
        >
          <Plus size={24} />
        </button>

        {showModal && (
          <AddMessageModal
            boardId={board.id}
            onClose={() => setShowModal(false)}
            onSaved={load}
          />
        )}
      </div>
    </div>
  );
}
