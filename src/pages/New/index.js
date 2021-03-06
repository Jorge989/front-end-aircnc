import React, { useState, useMemo } from "react";
import api from "../../services/api";
import { useHistory } from "react-router-dom";
import camera from "../../assets/camera.svg";
import "./styles.css";
export default function New() {
  const history = useHistory();
  const [company, setCompany] = useState("");
  const [techs, setTechs] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);
  async function handleSubmit(e) {
    e.preventDefault();
    const user_id = localStorage.getItem("user");
    const data = new FormData();
    data.append("thumbnail", thumbnail);
    data.append("company", company);
    data.append("techs", techs);
    data.append("price", price);
    await api.post("/spots", data, {
      headers: { user_id },
    });
    history.push("/dashboard");
  }
  return (
    <form onSubmit={handleSubmit}>
      <label
        className={thumbnail ? "has-thumbnail" : ""}
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
      >
        <input type="file" onChange={(e) => setThumbnail(e.target.files[0])} />
        <img src={camera} alt="Selecione imagem" />
      </label>
      <label htmlFor="company">EMPRESA *</label>
      <input
        id="company"
        placeholder="Sua empresa incrível"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <label htmlFor="company">
        TECNOLOGIAS *<span>(separadas por virgula)</span>
      </label>
      <input
        id="techs"
        placeholder="Quais tecnologias usam?"
        value={techs}
        onChange={(e) => setTechs(e.target.value)}
      />
      <label htmlFor="company">
        VALOR DA DIÁRIA *<span>(em branco para GRATUITO)</span>
      </label>
      <input
        id="price"
        placeholder="Valor cobrado por dia "
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit" className="btn">
        Cadastrar
      </button>
    </form>
  );
}
