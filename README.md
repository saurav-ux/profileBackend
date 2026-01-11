# 🚀 Team Manager

A high-performance, responsive **full-stack** application designed for searching, filtering, and strategically assembling specialized teams from a large member directory.

---

## 📋 Table of Contents

* Features
* Tech Stack
* Architecture
* Backend Overview
* Getting Started
* Deployment
* Optimizations

---

## ✨ Features

### 🔍 Advanced Member Directory

* **Multi-faceted Filtering:** Filter hundreds of profiles by **Domain, Gender, and Availability** simultaneously.
* **Smart Search:** Real-time search powered by **debounced inputs** to minimize unnecessary API overhead.
* **Status Tracking:** Visual badges instantly identify whether a member is **Available** or **Busy**.

### 🏗️ Dynamic Team Builder

* **Interactive Selection:** Create teams by naming them and adding members through a filtered selection flow.
* **Validation Logic:** Prevents duplicate teams and ensures only **available members** can be assigned.
* **Team Dashboard:** A **Show Teams** view that groups members by team name in a clean, structured layout.

### 🎨 Modern UI/UX

* **Professional Dashboard UI:** Built with **Material UI** for a polished enterprise look.
* **Responsive Design:** Optimized for **Mobile, Tablet, and Desktop** using MUI’s Grid system.

---

## 🛠️ Tech Stack

### Frontend

* **Framework:** React.js
* **State Management:** Redux Toolkit (RTK)
* **Data Fetching:** RTK Query (Caching & synchronization)
* **UI Framework:** Material UI (MUI) & React-Bootstrap
* **Routing:** React Router DOM
* **Deployment:** Netlify

### Backend

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (Atlas)
* **ODM:** Mongoose
* **API Style:** RESTful APIs

---

## 🏗️ Architecture

The application follows a **clean full-stack modular architecture**:

### Frontend

* **Services:** RTK Query APIs handle all asynchronous operations and caching.
* **Components:** Functional components manage local UI state (modals, filters, inputs).
* **Styles:** Modular CSS combined with MUI styled components.

### Backend

* **Routes:** Separate Express routers for Profiles and Teams.
* **Models:** Mongoose schemas for `ProfileData` and `TeamData`.
* **Controllers:** Centralized business logic for team creation and availability updates.
* **Validation Layer:** Ensures required fields exist before database writes.

---

## 🧩 Backend Overview

The backend is responsible for **data integrity, availability management, and team persistence**.

### 🔐 Core Responsibilities

* Fetch and filter member profiles
* Create teams with validation
* Automatically update member availability when assigned to a team
* Prevent duplicate or invalid team entries

### 📦 Key Collections

* **ProfileData**

  * Stores all user profiles
  * Tracks availability status (`available: true | false`)
* **TeamData**

  * Stores team-member mappings
  * Includes team name and full member metadata for faster reads

### 🔄 Business Logic Flow

1. User selects available members from the UI
2. Frontend sends team payload to backend
3. Backend:

   * Validates member availability
   * Inserts team records
   * Updates assigned profiles → `available: false`
4. Updated data is reflected instantly via RTK Query cache sync

---

## 🚀 Getting Started

### Frontend Setup

```bash
git clone https://github.com/saurav-ux/profileFrontend.git
cd profileFrontend
npm install
npm start
```

### Backend Setup

```bash
git clone https://github.com/saurav-ux/profileBackend.git
cd backend
npm install
npm run dev
```

> ⚠️ Ensure MongoDB Atlas URI is configured in `.env`

---

## ⚡ Optimizations

To ensure **enterprise-grade performance**, the following strategies were implemented:

* **API Debouncing:**
  500ms debounce on search inputs, reducing API calls by **~40%**.

* **Memoized Filtering:**
  Used `useMemo` for member filtering during team creation to keep UI lag-free with large datasets.

* **Efficient Data Modeling:**
  Team records store essential profile data to minimize expensive joins.

* **Optimized Rendering:**
  Conditional rendering for loading and error states ensures smooth UX transitions.

---

## ☁️ Deployment

### Frontend (Netlify)

The project is configured for Netlify deployment.

**Netlify Build Command (if warnings fail builds):**

```bash
CI=false npm run build
```

### Backend

* Deployable on **Render / Railway / AWS / Vercel**
* MongoDB hosted on **MongoDB Atlas**

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the issues page or open a PR.

---

### ❤️ Created by **Saurav**

