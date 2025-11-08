"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) router.push("/admin");
    else {
      const data = await res.json();
      setError(data.message);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-3xl font-bold">🔐 เข้าสู่ระบบผู้ดูแล</h1>

      <form onSubmit={handleLogin} className="flex flex-col gap-4 border p-6 rounded-lg w-80">
        <input
          type="email"
          placeholder="อีเมล"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="รหัสผ่าน"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-600 text-white py-2 rounded">เข้าสู่ระบบ</button>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </main>
  );
}
