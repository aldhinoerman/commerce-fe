import React from "react";

interface ModalProps extends React.PropsWithChildren {
  id: string;
  title: string;
  closeText?: string;
}

function Modal({ id, title, closeText, children }: ModalProps) {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box bg-white">
        <h3 className="font-bold text-lg">{title}</h3>

        {children}

        <form method="dialog">
          <button className="btn btn-ghost">
            {closeText ? closeText : "Close"}
          </button>
        </form>
      </div>
    </dialog>
  );
}

export default Modal;
