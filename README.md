# 🚀 Level-Up

**Level-Up** is a gamified learning platform for developers where users level up their technical skills by completing real coding tasks, earning XP, maintaining streaks, and competing on live leaderboards.

Think of it as **Duolingo × GitHub × RPG mechanics** — built for developers.

---

## ✨ Key Features

- 🎯 **Learning Paths & Levels**
  - Structured paths like Frontend, Backend, Full Stack
  - Levels unlock based on XP and progress

- 🧩 **Task-Based Learning**
  - Real coding tasks instead of passive learning
  - Tasks include building, debugging, and explaining concepts

- ⚡ **XP & Leveling System**
  - Earn XP on task completion
  - Levels unlock automatically when XP requirements are met

- 🔥 **Streak System**
  - Daily activity keeps your streak alive
  - Encourages consistent learning habits

- 🏆 **Leaderboards**
  - Global XP leaderboard
  - Weekly and streak-based rankings
  - Optimized using Redis

- 💬 **Real-time Chat**
  - Global and path-based chat
  - Built using WebSockets (Socket.io)

- 🤝 **Peer Review & Verification (Planned)**
  - Submit GitHub repos or live links
  - Community validation for completed tasks

- 👤 **Developer Profile**
  - Public profile with progress, XP, streaks, and badges
  - Shareable link for recruiters

---

## 🛠 Tech Stack

### Frontend
- **Next.js** (App Router)
- **Tailwind CSS**
- **TypeScript**

### Backend
- **Node.js**
- **Express.js**
- **REST APIs**

### Real-time
- **Socket.io (WebSockets)**

### Database & Caching
- **PostgreSQL**
- **Prisma ORM**
- **Redis** (leaderboards, streaks, caching)

### Authentication
- **GitHub OAuth**
- **JWT (JSON Web Tokens)**

### Deployment
- **Frontend:** Vercel  
- **Backend:** Render / Railway  

---

## 🧠 System Architecture



Next.js Frontend
|
REST APIs + WebSockets
|
Express Backend
|          |
PostgreSQL   Redis

---

## 🧪 Core Learning Flow

1. User signs in using GitHub OAuth
2. Selects a learning path (e.g., Frontend)
3. Completes tasks inside levels
4. Earns XP and unlocks new levels
5. Maintains streaks through daily activity
6. Competes on leaderboards in real time

---

## 📂 Project Structure
```
Level-Up/
├── frontend/   # Next.js frontend
└── backend/    # Express backend
```
---

## 🚧 Roadmap
```
- [ ] GitHub repository submission & validation
- [ ] Peer review system for task approval
- [ ] Boss levels (project-based challenges)
- [ ] AI-powered feedback for code submissions
- [ ] Recruiter dashboard
```
---

## 🎯 Why Level-Up?

Level-Up focuses on **learning by doing**, not just watching tutorials.  
It emphasizes:
- Consistency
- Real-world coding practice
- Community-driven validation
- Resume-ready skill proof

---

## 🤝 Contributing

Contributions are welcome!  
Feel free to fork the repo, open issues, or submit pull requests.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

Built with ❤️ by **Mohit Joshi**
