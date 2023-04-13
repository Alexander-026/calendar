import React, {useMemo, useEffect} from 'react';
import {createPortal} from "react-dom";
import styles from "./ModalWindow.module.scss";
const body: HTMLBodyElement | null = document.querySelector("body");

type ModalWindowProps = {
  children: React.ReactNode;
};

const ModalWindow:React.FC<ModalWindowProps> = ({children}) => {
  const modal:HTMLDivElement = useMemo(() =>  document.createElement("div"), [])
  useEffect(() => {
    modal.classList.add(styles.ModalWindow)
    body?.classList.add("fixed")
    body?.appendChild(modal)
    return () => {
      body?.removeChild(modal);
      body?.classList.remove("fixed");
    }
  }, [modal])

  const wrapperForChildren = (
    <div className={styles.wrapperChildren}>
      {children}
    </div>
  );

  return createPortal(wrapperForChildren, modal)
};

export default ModalWindow;