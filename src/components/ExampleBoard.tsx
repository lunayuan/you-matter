import "../styles/components/example-board.css";

const SAMPLE_MESSAGES = [
  {
    author: "Alex",
    content:
      "Your mentorship changed the trajectory of my career. Thank you for always believing in me.",
    color: "#fef3e2",
  },
  {
    author: "Jordan",
    content:
      "Every team meeting was brighter because of your energy. We will miss your laugh!",
    color: "#fce4ec",
  },
  {
    author: "Priya",
    content:
      "You taught me that great leadership is about lifting others up. I am forever grateful.",
    color: "#e8f5e9",
  },
  {
    author: "Marcus",
    content:
      "From late-night deploys to Friday celebrations, every moment with you was memorable.",
    color: "#e3f2fd",
  },
];

export default function ExampleBoard() {
  return (
    <div className="example-board">
      <div className="example-header">
        <div className="example-avatar">SC</div>
        <div>
          <h3>Sarah Chen</h3>
          <p className="example-dedication">
            Thank you for 5 amazing years of leadership and friendship.
          </p>
        </div>
      </div>

      <div className="example-messages">
        {SAMPLE_MESSAGES.map((msg, i) => (
          <div
            key={i}
            className="example-msg"
            style={{ background: msg.color }}
          >
            <p>{msg.content}</p>
            <span className="example-msg-author">— {msg.author}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
