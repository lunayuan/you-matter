import { useParams, Link } from "react-router-dom";
import { Copy, ArrowLeft, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import "../styles/pages/board-success.css";

export default function BoardSuccess() {
  const { slug } = useParams<{ slug: string }>();
  const boardUrl = `${window.location.origin}/board/${slug}`;

  const copy = async () => {
    await navigator.clipboard.writeText(boardUrl);
    toast.success("Link copied!");
  };

  return (
    <div className="success-page">
      <div className="container">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} /> Home
        </Link>

        <div className="success-card card">
          <h1>Board Created!</h1>
          <p className="success-subtitle">
            Share this link with the team so they can leave their messages.
          </p>

          <div className="link-box">
            <span className="link-text">{boardUrl}</span>
            <button className="btn btn-outline copy-btn" onClick={copy}>
              <Copy size={16} /> Copy
            </button>
          </div>

          <Link to={`/board/${slug}`} className="btn btn-primary view-btn">
            <ExternalLink size={16} /> View Board
          </Link>
        </div>
      </div>
    </div>
  );
}
