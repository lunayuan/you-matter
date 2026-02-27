import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import { db } from "./firebase";

/* ── Types ── */
export interface Board {
  id: string;
  slug: string;
  recipient_name: string;
  recipient_photo?: string;
  dedication?: string;
  created_by: string;
  created_at: Timestamp;
}

export interface Message {
  id: string;
  board_id: string;
  author: string;
  content: string;
  color: string;
  created_at: Timestamp;
}

/* ── Board helpers ── */
const boardsCol = collection(db, "boards");
const messagesCol = collection(db, "messages");

export async function createBoard(data: {
  recipient_name: string;
  recipient_photo?: string;
  dedication?: string;
  created_by: string;
}): Promise<string> {
  const slug = nanoid(10);
  await addDoc(boardsCol, {
    ...data,
    slug,
    created_at: serverTimestamp(),
  });
  return slug;
}

export async function getBoardBySlug(slug: string): Promise<Board | null> {
  const q = query(boardsCol, where("slug", "==", slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const doc = snap.docs[0];
  return { id: doc.id, ...doc.data() } as Board;
}

/* ── Message helpers ── */
const MESSAGE_COLORS = [
  "#fef3e2",
  "#fce4ec",
  "#e8f5e9",
  "#e3f2fd",
  "#f3e5f5",
  "#fff8e1",
  "#e0f2f1",
  "#fbe9e7",
];

function pickColor(): string {
  return MESSAGE_COLORS[Math.floor(Math.random() * MESSAGE_COLORS.length)];
}

export async function addMessage(data: {
  board_id: string;
  author: string;
  content: string;
}): Promise<void> {
  await addDoc(messagesCol, {
    ...data,
    color: pickColor(),
    created_at: serverTimestamp(),
  });
}

export async function getMessagesForBoard(boardId: string): Promise<Message[]> {
  const q = query(
    messagesCol,
    where("board_id", "==", boardId),
    orderBy("created_at", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Message));
}
