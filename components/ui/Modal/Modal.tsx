import React from "react";
import Modal from "react-modal";
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CustomModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles['modal-content']}
      overlayClassName={styles['modal-overlay']}
      ariaHideApp={false}
    >
      <div className={styles['modal-header']}>
      </div>
      <div className={styles['modal-body']}>
        
        {children}</div>
    </Modal>
  );
};

export default CustomModal;
