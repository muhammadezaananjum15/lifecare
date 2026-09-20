import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Medicine } from '../data/medicines';

export interface CartItem {
  medicine: Medicine;
  quantity: number;
}

interface Toast {
  id: number;
  message: string;
  sub?: string;
}

interface CartContextType {
  items: CartItem[];
  toasts: Toast[];
  addToCart: (medicine: Medicine) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [toastId, setToastId] = useState(0);

  const showToast = useCallback((message: string, sub?: string) => {
    const id = toastId + 1;
    setToastId(id);
    setToasts(prev => [...prev, { id, message, sub }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, [toastId]);

  const addToCart = useCallback((medicine: Medicine) => {
    setItems(prev => {
      const existing = prev.find(i => i.medicine.id === medicine.id);
      if (existing) {
        showToast('Quantity updated!', medicine.name);
        return prev.map(i =>
          i.medicine.id === medicine.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      showToast('Added to cart!', medicine.name);
      return [...prev, { medicine, quantity: 1 }];
    });
  }, [showToast]);

  const removeFromCart = useCallback((id: number) => {
    setItems(prev => prev.filter(i => i.medicine.id !== id));
    showToast('Removed from cart');
  }, [showToast]);

  const updateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => i.medicine.id !== id));
      return;
    }
    setItems(prev =>
      prev.map(i => i.medicine.id === id ? { ...i, quantity } : i)
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.medicine.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, toasts, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, subtotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
