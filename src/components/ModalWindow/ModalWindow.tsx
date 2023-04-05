import React, { Component } from "react";
import ReactDOM from "react-dom";

import styles from "./ModalWindow.module.scss";

type ModalWindowProps = {
  children: React.ReactNode;
};

class ModalWindow extends Component<ModalWindowProps> {
  private modal: HTMLDivElement = document.createElement("div");
  private body: HTMLBodyElement | null = document.querySelector("body");
  public componentDidMount(): void {
    this.modal.classList.add(styles.ModalWindow);
    this.body?.classList.add("fixed");
    document.body.appendChild(this.modal);
  }

  public componentWillUnmount(): void {
    document.body.removeChild(this.modal);
    this.body?.classList.remove("fixed");
  }
  public render(): React.ReactElement<ModalWindowProps> {
   const { children} = this.props
    const wrapperForChildren = (
      <div className={styles.wrapperChildren}>
        {children}
      </div>
    );
    return ReactDOM.createPortal(wrapperForChildren, this.modal);
  }
}

export default ModalWindow;
