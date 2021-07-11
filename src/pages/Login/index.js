import React, { useState } from "react";
import api from "../../services/api";
export default function Login({ history }) {
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await api.post("/sessions", { email: email });

    const { _id } = response.data;

    localStorage.setItem("user", _id);
    history.push("/dashboard");
  }
  return (
    <>
      <p>
        Ofereça <strong>spots</strong> para programadores e econtre{" "}
        <strong>talentos</strong> para sua emrpesa
      </p>
      <form onSubmit={handleSubmit}>
        <label type="email">E-MAIL *</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          value={email}
          placeholder="Seu melhor e-mail"
        />
        <button className="btn" type="submit">
          Entrar
        </button>
      </form>
    </>
  );
}
