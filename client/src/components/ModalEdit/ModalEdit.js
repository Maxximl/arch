import React, { useEffect } from "react";
import AddGreenhouseForm from "../AddGreenhouseForm";
import "./ModalEdit.css";

const ModalEdit = ({
  id,
  name,
  description,
  imgData,
  fileName,
  type,
  onReloadHandler,
}) => {
  useEffect(() => {
    var elems = document.querySelectorAll(".modal");

    window.M.Modal.init(elems, {});
    window.M.updateTextFields();
  });
  return (
    <div>
      <div id={id} className="modal" style={{ zIndex: 199 }}>
        <div className="modal-content">
          <h4>Редактирование</h4>
          <div className="inner-content">
            <AddGreenhouseForm
              onReloadHandler={onReloadHandler}
              type={type}
              idx={id}
              name={name}
              description={description}
              imgData={imgData}
              fileName={fileName}
            />
          </div>
        </div>
        <div className="modal-footer">
          <a href="#!" className=" waves-effect waves-green btn-flat">
            Disagree
          </a>
          <a href="#!" className=" waves-effect waves-green btn-flat">
            Agree
          </a>
        </div>
      </div>
    </div>
  );
};

export default ModalEdit;
