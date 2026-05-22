# VentureLink

**VentureLink** is a comprehensive, end-to-end **MERN stack** (MongoDB, Express.js, React, Node.js) application designed to serve as a premium co-founder matching and investor syndication platform. 

## 💡 The Idea

Finding the right co-founder or securing seed investment is one of the hardest challenges in building a startup. VentureLink bridges this gap by providing a unified ecosystem with three distinct roles:

1. **Technical Founders:** Developers and engineers looking for business-minded partners with great ideas.
2. **Business Founders:** Visionaries with market research and business plans looking for technical execution partners.
3. **Investors:** Angels and VCs looking to discover verified startup workspaces and commit capital to promising pitch decks.

When a Technical Founder and a Business Founder match, they instantly get access to a **"War Room"**—a private workspace equipped with real-time chat and a shared Kanban board to immediately start executing their vision. Investors can browse these active workspaces, view pitch decks, and track funding goals in real-time.

## 🛠️ Technical Architecture

VentureLink is built using modern, scalable web technologies with a strict focus on clean, minimal code aesthetics.

### Tech Stack
* **Database:** MongoDB Atlas via Mongoose ODM.
* **Backend:** Node.js & Express.js REST API.
* **Frontend:** React (scaffolded with Vite), utilizing modern React Hooks.
* **State Management:** Zustand for lightweight, global client-side state.
* **Real-Time Communication:** Socket.io for duplex real-time War Room chat.
* **Styling:** Tailwind CSS v4 configured for a premium, minimal dark-mode aesthetic.

### Core Features
* **Role-Based Access Control (RBAC):** Custom JWT authentication middleware ensuring users only access dashboards relevant to their registered role (Technical, Business, Investor).
* **Algorithmic Match Engine:** A sophisticated MongoDB aggregation pipeline that calculates a dynamic `matchScore` between founders based on time commitment availability and overlapping industry interests.
* **Real-Time WebSockets:** The War Room utilizes `socket.io` rooms (`joinRoom`, `sendMessage`) to ensure private, instant team communication without refreshing the page.
* **Dockerized Environments:** The entire application is orchestrated using Docker and Docker Compose, with a multi-stage Nginx build for the React frontend and an Alpine Node build for the backend.

## 🚀 How to Run Locally

VentureLink is fully Dockerized for a seamless developer experience.

**Prerequisites:** Ensure you have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

1. Clone the repository:
   ```bash
   git clone https://github.com/Likhithreddy99/VentureLink.git
   cd VentureLink
   ```

2. Start the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

3. Access the platform:
   * **Frontend UI:** `http://localhost:80`
   * **Backend API:** `http://localhost:5000`

---
*Built with clean code principles—zero unnecessary comments, intuitive directory structures, and a premium minimal UI.*
