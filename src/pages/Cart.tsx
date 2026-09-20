import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { Trash2, ShoppingBag, ArrowRight, Package, Truck, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();
  const delivery = subtotal > 2000 ? 0 : 150;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + tax;

  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.fromTo('.page-hero-content', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.1 });
    gsap.fromTo('.cart-content', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.3 });
  }, []);

  const handlePlaceOrder = () => {
    gsap.to('.cart-content', { opacity: 0, y: -20, duration: 0.4, ease: 'power3.in', onComplete: () => {
      clearCart();
      setOrderPlaced(true);
      gsap.fromTo('.order-success', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' });
    }});
  };

  if (orderPlaced) {
    return (
      <>
        <section className="page-hero">
          <div className="container page-hero-content">
            <h1 className="page-hero-title">Order Confirmation</h1>
          </div>
        </section>
        <section className="section" style={{ background: 'var(--gray-50)' }}>
          <div className="container order-success" style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ width: 100, height: 100, background: 'var(--green-50)', border: '3px solid var(--green-200)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', fontSize: '2.5rem', color: 'var(--primary)' }}>
              <i className="fa-solid fa-check" />
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--gray-900)', marginBottom: 12 }}>Order Placed Successfully!</h2>
            <p style={{ color: 'var(--gray-500)', marginBottom: 8, lineHeight: 1.7 }}>
              Your medicines will be delivered to your address within <strong>2–4 hours</strong>. You will receive an SMS confirmation shortly.
            </p>
            <div style={{ background: 'var(--white)', border: '1px solid var(--green-200)', borderRadius: 'var(--radius-xl)', padding: 24, margin: '32px 0', textAlign: 'left' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { icon: <Package size={16} />, label: 'Order ID', val: `LC-${Date.now().toString().slice(-8)}` },
                  { icon: <Truck size={16} />, label: 'Estimated Delivery', val: '2–4 Hours' },
                  { icon: <Shield size={16} />, label: 'Payment', val: 'Cash on Delivery' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--gray-100)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--gray-500)', fontSize: '0.875rem' }}>
                      <span style={{ color: 'var(--primary)' }}>{item.icon}</span>
                      {item.label}
                    </div>
                    <span style={{ fontWeight: 600, color: 'var(--gray-900)', fontSize: '0.875rem' }}>{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <Link to="/medicines" className="btn btn-primary btn-lg">
                <ShoppingBag size={16} /> Continue Shopping
              </Link>
              <Link to="/" className="btn btn-outline btn-lg">Go to Home</Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <span className="breadcrumb-item">Home</span>
            <span className="breadcrumb-sep">›</span>
            <Link to="/medicines" className="breadcrumb-item" style={{ color: 'rgba(255,255,255,0.5)' }}>Pharmacy</Link>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-item active">My Cart</span>
          </div>
          <h1 className="page-hero-title">Shopping Cart</h1>
          <p className="page-hero-desc">{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--gray-50)', paddingTop: 48 }}>
        <div className="container cart-content">
          {items.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon"><ShoppingBag size={32} /></div>
              <h3 className="empty-state-title">Your cart is empty</h3>
              <p className="empty-state-desc">Add medicines from our pharmacy to get started</p>
              <Link to="/medicines" className="btn btn-primary btn-lg">
                <i className="fa-solid fa-pills" /> Browse Medicines
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 32, alignItems: 'start' }}>
              {/* Cart Items */}
              <div>
                {/* Delivery banner */}
                {subtotal < 2000 && (
                  <div style={{ background: 'linear-gradient(135deg, var(--green-50), var(--green-100))', border: '1px solid var(--green-200)', borderRadius: 'var(--radius-lg)', padding: '14px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12, fontSize: '0.875rem', color: 'var(--green-800)' }}>
                    <Truck size={16} style={{ color: 'var(--primary)' }} />
                    Add <strong style={{ margin: '0 4px' }}>PKR {(2000 - subtotal).toLocaleString()}</strong> more for <strong style={{ margin: '0 4px' }}>FREE delivery!</strong>
                    <div style={{ flex: 1, height: 4, background: 'var(--green-200)', borderRadius: 4, overflow: 'hidden', marginLeft: 8 }}>
                      <div style={{ width: `${(subtotal / 2000) * 100}%`, height: '100%', background: 'var(--primary)', borderRadius: 4, transition: 'width 0.5s' }} />
                    </div>
                  </div>
                )}

                <div className="card" style={{ padding: '8px 32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', borderBottom: '2px solid var(--gray-100)', marginBottom: 0 }}>
                    <h3 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Order Items ({items.length})</h3>
                    <button className="btn btn-outline btn-sm" style={{ color: '#ef4444', borderColor: '#fecaca' }} onClick={clearCart}>
                      <Trash2 size={12} /> Clear All
                    </button>
                  </div>

                  {items.map(item => (
                    <div key={item.medicine.id} className="cart-item">
                      <img
                        src={item.medicine.image}
                        alt={item.medicine.name}
                        className="cart-item-img"
                      />
                      <div>
                        <div className="cart-item-name">{item.medicine.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginBottom: 6 }}>
                          {item.medicine.dosage} · {item.medicine.unit} · {item.medicine.manufacturer}
                        </div>
                        <div className="cart-item-price">PKR {item.medicine.price} each</div>
                        <div style={{ marginTop: 12 }}>
                          <div className="qty-control" style={{ display: 'inline-flex' }}>
                            <button className="qty-btn" onClick={() => updateQuantity(item.medicine.id, item.quantity - 1)}>−</button>
                            <span className="qty-num">{item.quantity}</span>
                            <button className="qty-btn" onClick={() => updateQuantity(item.medicine.id, item.quantity + 1)}>+</button>
                          </div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>
                          PKR {(item.medicine.price * item.quantity).toLocaleString()}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.medicine.id)}
                          style={{ color: '#ef4444', background: '#fff1f2', border: 'none', width: 32, height: 32, borderRadius: 'var(--radius-md)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Trust badges */}
                <div style={{ display: 'flex', gap: 16, marginTop: 20, flexWrap: 'wrap' }}>
                  {[
                    { icon: <Shield size={16} />, text: '100% Secure Checkout' },
                    { icon: <Truck size={16} />, text: 'Fast Delivery in Karachi' },
                    { icon: <Package size={16} />, text: 'Original Products Only' },
                  ].map(b => (
                    <div key={b.text} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--gray-500)', fontSize: '0.8rem' }}>
                      <span style={{ color: 'var(--primary)' }}>{b.icon}</span>
                      {b.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="cart-summary">
                <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 20 }}>Order Summary</h3>
                <div className="cart-summary-row">
                  <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span>PKR {subtotal.toLocaleString()}</span>
                </div>
                <div className="cart-summary-row">
                  <span>Delivery</span>
                  <span style={{ color: delivery === 0 ? 'var(--primary)' : 'inherit', fontWeight: delivery === 0 ? 600 : 400 }}>
                    {delivery === 0 ? 'FREE' : `PKR ${delivery}`}
                  </span>
                </div>
                <div className="cart-summary-row">
                  <span>GST (5%)</span>
                  <span>PKR {tax.toLocaleString()}</span>
                </div>
                <div className="cart-summary-total">
                  <span>Total</span>
                  <span style={{ color: 'var(--primary)' }}>PKR {total.toLocaleString()}</span>
                </div>

                {/* Payment method */}
                <div style={{ background: 'var(--gray-50)', borderRadius: 'var(--radius-md)', padding: 16, marginBottom: 20 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--gray-700)', marginBottom: 10 }}>Payment Method</div>
                  {['Cash on Delivery', 'JazzCash / EasyPaisa', 'Credit / Debit Card'].map((m, i) => (
                    <label key={m} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', cursor: 'pointer', fontSize: '0.875rem', color: 'var(--gray-600)', borderBottom: i < 2 ? '1px solid var(--gray-100)' : 'none' }}>
                      <input type="radio" name="payment" defaultChecked={i === 0} style={{ accentColor: 'var(--primary)' }} />
                      {m}
                    </label>
                  ))}
                </div>

                <button className="btn btn-primary w-full" style={{ fontSize: '1rem', padding: '16px', marginBottom: 12 }} onClick={handlePlaceOrder}>
                  Place Order — PKR {total.toLocaleString()} <ArrowRight size={16} />
                </button>
                <Link to="/medicines" className="btn btn-outline w-full">
                  Continue Shopping
                </Link>
                <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--gray-400)', marginTop: 12 }}>
                  <Shield size={11} style={{ display: 'inline', marginRight: 4 }} />
                  Your personal data is secure with us
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Cart;
