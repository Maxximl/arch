import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";

const CreatePage = () => {
  const [linkName, setLinkName] = useState("");
  const { request } = useHttp();
  const auth = useContext(AuthContext);
  const history = useHistory();
  const changeHandler = (event) => {
    setLinkName(event.target.value);
  };

  const pressKeyHandler = async (event) => {
    if (event.key === "Enter") {
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          { from: linkName },
          { Authorization: `Bearer ${auth.token}` }
        );
        console.log(data);
        history.push(`/detail/${data.link._id}`);
      } catch (error) {}
    }
  };
  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
        <div className="input-field">
          <input
            placeholder="Введите email"
            id="email"
            type="text"
            name="email"
            onChange={changeHandler}
            value={linkName}
            onKeyPress={pressKeyHandler}
          />
          <label htmlFor="email">Email</label>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
