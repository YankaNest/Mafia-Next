import React from "react";
import Modal from "react-modal";
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const CustomModal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles['modal-content']}
      overlayClassName={styles['modal-overlay']}
      ariaHideApp={false}
    >
      <div className={styles['modal-header']}>
        <h2>{title}</h2>
        <button onClick={onClose} className={styles['close-button']}>×</button>
      </div>
      <div className={styles['modal-body']}>
        
        {children}</div>
    </Modal>
  );
};

export default CustomModal;
