import styles from './Modal.module.css';

function Modal({ onClose, children }) {
  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <img
            src="/images/close.svg"
            alt="Checkmark"
            className={styles.checkmark131}
          />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
