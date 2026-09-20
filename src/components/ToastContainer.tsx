import { useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';

const ToastContainer = () => {
  const { toasts } = useCart();

  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className="toast">
          <div className="toast-icon">
            <i className="fa-solid fa-circle-check" />
          </div>
          <div>
            <div className="toast-text">{t.message}</div>
            {t.sub && <div className="toast-sub">{t.sub}</div>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
