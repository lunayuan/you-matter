# You Matter — Lovable Build Prompt

## How to Use This File

Copy the prompt below and paste it into Lovable as your first message when starting a new project. This should generate the core structure of the app in one shot. After the first generation, you'll iterate on details through follow-up messages.

---

## The Prompt (Copy Everything Below This Line)

---

Build a web app called **"You Matter"** — a place where colleagues can create a farewell appreciation board for someone who has left or is leaving their company. This is not a corporate tool. It lives outside company systems. No login or account required for any user.

The app has a warm, human, emotionally resonant design. Think soft backgrounds, generous whitespace, rounded cards, gentle transitions. The overall feeling should be: opening a heartfelt gift, not using a software tool. Use a warm neutral palette — soft whites, warm grays, and one accent color (something like a muted gold or warm coral). Typography should feel personal, not corporate — consider a clean serif for headings and a readable sans-serif for body text.

### Pages and Flows

#### 1. Landing Page (route: `/`)

**Hero section:**
- Headline: **"When someone is leaving, the connections don't have to."**
- Subheadline: "Create a board where colleagues can share what someone truly meant to them — as a person, not just an employee."
- One primary button: **"Create a Board"** (links to the create page)

**Below the fold:**
- Section titled "How it works" with three simple steps displayed as cards:
  - Step 1: "Create a board for someone" (icon: heart or gift)
  - Step 2: "Share the link with colleagues" (icon: share/link)
  - Step 3: "They receive a page of messages that remind them: they mattered" (icon: letter/envelope)
- Below the steps, show a **preview mockup** of what a completed board looks like. Use placeholder content — a fictional person named "Sarah Chen" with 4-5 example messages displayed as cards. Make these feel real and emotional, not generic. Examples:
  - "I'll always remember the time you talked me through my first big presentation. You didn't have to stay late, but that was you. Thank you for making it okay to be nervous." — Jamie
  - "You brought so much warmth to Monday mornings. The team won't be the same without your laugh." — Anonymous
  - "You believed in my weird ideas before anyone else did. That changed my career. I hope you know that." — Priya
  - "I'm not good at these things, but I wanted you to know — you mattered to me more than I ever said." — Marcus

**Footer:** Simple footer with "Built with ❤️" and a small link to "Create a Board"

#### 2. Create a Board Page (route: `/create`)

A simple, clean form with the following fields:

- **"Who is this for?"** — text input for the person's name (required)
- **"Add their photo"** — image upload, optional, with a nice placeholder avatar if skipped
- **"Your dedication"** — text input with placeholder text: *e.g., "For Sarah, who made Monday mornings survivable"* (required). This sets the emotional tone for the whole board.
- **"Your name"** — text input with placeholder *"So they know who started this"* (optional — if left blank, show as "Someone who cares")

Button: **"Create the Board"**

On submit:
- Generate a unique board with a random URL slug (e.g., `/board/sarah-abc123`)
- Store in Supabase: board ID, recipient name, photo URL, dedication text, creator name, created date
- Redirect to a **"Your board is ready"** success page that shows:
  - The board link prominently, with a **"Copy Link"** button
  - A ready-to-share message they can copy: *"Hey — I'm collecting messages for [Name] before they go. If you'd like to share what they meant to you, add yours here: [link]"*
  - A **"View the Board"** button to see it
  - A small note: *"Share this link with colleagues via WhatsApp, personal email, or text — anywhere outside the company system."*

#### 3. Board Page (route: `/board/:slug`)

This is the main page — both where contributors add messages and where the recipient eventually reads them.

**Top section:**
- The recipient's name (large, warm typography)
- Their photo (or placeholder avatar)
- The dedication line from the creator
- A count: "[X] messages so far"

**Messages section:**
- Display all messages as cards in a clean grid or masonry layout
- Each card shows: the message text, and the contributor's name (or "Anonymous")
- Cards should feel like handwritten notes — consider subtle background variation, slight rotation, or soft shadows to make them feel tactile and personal, not like a database list

**Contribute section (below or accessible via a floating button):**
- A prominent button: **"Add Your Message"**
- Clicking this opens a modal or expands an inline section with two options:
  - **"I know what I want to say"** → opens a simple text area to write freely, plus a name field (optional, default anonymous)
  - **"Help me find the words"** → opens the guided flow (see below)

#### 4. Guided Message Flow ("Help me find the words")

This appears as a stepped flow inside the modal/section. Show one question at a time for focus.

**Question 1:** "What's a moment with [Name] you'll always remember?"
- Text area, placeholder: *"It can be big or small — a project, a conversation, a Tuesday afternoon..."*

**Question 2:** "What did [Name] bring to your work life?"
- Text area, placeholder: *"Think about how they made you feel, not what they delivered..."*

**Question 3:** "Anything else you want them to know?"
- Text area, placeholder: *"Last chance to say the thing you never got around to saying..."*

After answering all three, show a **"Preview Your Message"** button.

When clicked, combine the three answers into a single warm paragraph. For the MVP, do this with a simple template approach (no AI API call needed for the very first version):

Take the three inputs and join them with light connecting language. Example template:

"[Answer 1 — moment]. [Answer 2 — what they brought]. [Answer 3 — anything else]."

Display this as a preview with:
- The composed message in a card that looks like how it will appear on the board
- An **"Edit"** button that lets them modify the text directly
- Their name or "Anonymous" selector
- A **"Post to Board"** button
- A **"Start Over"** link

On post: save to Supabase (board ID, message text, contributor name or null for anonymous, timestamp) and return to the board view with a confirmation message like "Your message has been added 💛"

#### 5. Share Prompt (on the board page)

At the bottom or top of the board page, show a subtle section:
- "Know someone else who'd want to add a message?"
- **"Copy Link to Share"** button

This should also appear after someone posts a message — "Want to invite others to add theirs?"

### Database Structure (Supabase)

**Table: boards**
- id (uuid, primary key)
- slug (text, unique) — the URL identifier
- recipient_name (text)
- recipient_photo_url (text, nullable)
- dedication (text)
- creator_name (text, default "Someone who cares")
- created_at (timestamp)

**Table: messages**
- id (uuid, primary key)
- board_id (uuid, foreign key → boards.id)
- message_text (text)
- contributor_name (text, nullable — null means anonymous)
- created_at (timestamp)

Both tables should have Row Level Security (RLS) enabled. Boards and messages should be publicly readable (anyone with the link can view). Boards can be created by anyone. Messages can be added by anyone to any board.

### Important Design Notes

- **No login anywhere.** The entire app works without accounts. The board URL is the "key."
- **Mobile-first responsive design.** Most people will receive and share these links on their phones.
- **The emotional tone is everything.** This is not a productivity tool. Every piece of copy, every transition, every color choice should feel warm, human, and gentle. Think: receiving a letter from a friend, not filling out a form.
- **Speed matters for the creator flow.** Someone should be able to go from landing page to shareable link in under 90 seconds.
- **The board page is a keepsake.** It should feel like something worth bookmarking and coming back to. Not ephemeral.

---

## End of Prompt

---

## After the First Generation — Follow-Up Prompts

Once Lovable generates the initial app, you'll want to iterate. Here are likely follow-up prompts in priority order:

1. **"Connect Supabase"** — Lovable will guide you through setting up the Supabase backend. Follow their flow to create the tables described above.

2. **"The message cards on the board feel too uniform. Make each card feel slightly different — vary the background tint subtly, add very slight rotation to some cards, so it feels like handwritten notes pinned to a board rather than a list."**

3. **"Add a confirmation animation when someone posts a message — a gentle fade-in of the new card on the board with a brief 💛 animation."**

4. **"On the landing page, the example board preview should scroll horizontally on mobile and show as a grid on desktop."**

5. **When you're ready for AI-assisted message drafting:** "In the guided flow, instead of using a template to combine the three answers, call the OpenAI API (or Anthropic API) to take the three inputs and draft a single warm, natural paragraph. The AI prompt should be: 'You are helping someone write a farewell message to a colleague. Based on their three answers below, write a single short paragraph (3-5 sentences) that sounds warm, natural, and personal — like something a real colleague would say. Do not sound corporate or generic. Keep their voice and specific details. Here are their answers: [1] [2] [3]'"

6. **If you want to add a "reveal" feature later:** "Add an option when creating a board to set it as 'hidden until revealed.' When this is on, contributors can still add messages, but the board shows a 'This board is being prepared for [Name]' message instead of the messages. The board creator gets a 'Reveal the Board' button that makes all messages visible and generates the shareable link for the recipient."
