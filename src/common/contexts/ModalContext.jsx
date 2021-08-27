import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  showModal: false,
  buttonName: "Delete",
  confirm: () => console.log("set confirm callback"),
  actionType: "",
};

const modalReducer = (state, action) => {
  const modalActions = {
    SET_MODAL_STATE: { ...state, showModal: action.payload },
    SET_CONFIRM_HANDLER: { ...state, confirm: action.payload },
    SET_ACTION_TYPE: { ...state, actionType: action.payload },
    SET_BUTTON_NAME: { ...state, buttonName: action.payload },
  };

  const newState = modalActions[action.type] || state;
  return newState;
};

const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
  const [modalState, modalDispatch] = useReducer(modalReducer, initialState);

  const cancel = () => {
    modalDispatch({ type: "SET_MODAL_STATE", payload: false });
  };

  return (
    <ModalContext.Provider value={{ modalState, modalDispatch, cancel }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(ModalContext);
};
