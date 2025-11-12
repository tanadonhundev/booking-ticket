# 🚀 Web App Assignment

โปรเจกต์นี้เป็นการบ้านสำหรับการประเมินทักษะการพัฒนา Fullstack Web Application  
โดยใช้ **Next.js** เป็น framework หลัก (รวมทั้ง frontend และ backend)  
พร้อมระบบ **BetterAuth**, **Drizzle ORM**, และ **Shadcn UI**

---

## 🧩 Tech Stack

- **Next.js v16 (App Router)** – ใช้ทั้งฝั่ง frontend + backend (API routes)  
- **BetterAuth** – ระบบ authentication สำหรับจัดการ session/token  
- **Drizzle ORM** – ORM เชื่อมต่อฐานข้อมูล (MySQL)  
- **Shadcn UI** – Component library สำหรับ UI ที่สวยและปรับแต่งง่าย  
- **TypeScript** – เพื่อความปลอดภัยของ type และลด bug  
- **Tailwind CSS** – สำหรับจัดการ style อย่างรวดเร็ว  

---

## ⚙️ การติดตั้งและรันโปรเจกต์

### 1. Clone โปรเจกต์
    git clone https://github.com/tanadonhundev/booking-ticket.git
    cd booking-ticket
### 2. ติดตั้ง dependencies
    npm install
### 3. ตั้งค่า environment variables
    DATABASE_URL="mysql://root:P@ssword@localhost/booking-ticket"

    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=P@ssword
    DB_DATABASE=booking-ticket
    DB_PORT=3306

    BETTER_AUTH_SECRET=P3YfR7wTR5DOTWmPFpaSMpdhtOeAguBW
    BETTER_AUTH_URL=http://localhost:3000 #อย่าลืมแก้ domain จริง

    NEXT_PUBLIC_BASE_URL=http://localhost:3000

### 4. รัน migration (Drizzle)
    npx drizzle-kit push
### 5. รันโปรเจกต์
    npm run dev

