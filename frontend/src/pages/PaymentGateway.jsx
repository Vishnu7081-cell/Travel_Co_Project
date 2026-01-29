import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore, usePaymentStore } from '../store/store.js';
import '../styles/pages.css';

function PaymentGateway() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { createPayment } = usePaymentStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: 0,
    paymentMethod: 'Credit Card',
    transactionId: `TXN-${Date.now()}`,
    breakdown: {
      transportCost: 0,
      accommodationCost: 0,
      activityCost: 0,
      tax: 0,
      discount: 0,
    },
  });

  const paymentMethods = ['Credit Card', 'Debit Card', 'Net Banking', 'UPI', 'Wallet'];

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleBreakdownChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      breakdown: {
        ...prev.breakdown,
        [name]: Number(value),
      },
    }));
  };

  const calculateTotal = () => {
    const { breakdown } = formData;
    return breakdown.transportCost + breakdown.accommodationCost + breakdown.activityCost + breakdown.tax - breakdown.discount;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const totalAmount = calculateTotal();
      await createPayment({
        tripId,
        customerId: user._id,
        amount: totalAmount,
        paymentMethod: formData.paymentMethod,
        transactionId: formData.transactionId,
        status: 'Success',
        paymentGateway: 'Stripe',
        breakdown: formData.breakdown,
        invoiceUrl: `https://example.com/invoice/${formData.transactionId}`,
        receiptUrl: `https://example.com/receipt/${formData.transactionId}`,
      });
      navigate(`/confirmation/${tripId}`);
    } catch (err) {
      console.error('Payment error:', err);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <header className="page-header">
        <button onClick={() => navigate('/dashboard')} className="back-btn">← Back</button>
        <h1>💳 Payment Gateway</h1>
      </header>

      <form onSubmit={handleSubmit} className="payment-form">
        <section className="cost-breakdown">
          <h2>Cost Breakdown</h2>

          <div className="form-row">
            <div className="form-group">
              <label>Transport Cost ($)</label>
              <input
                type="number"
                name="transportCost"
                value={formData.breakdown.transportCost}
                onChange={handleBreakdownChange}
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Accommodation Cost ($)</label>
              <input
                type="number"
                name="accommodationCost"
                value={formData.breakdown.accommodationCost}
                onChange={handleBreakdownChange}
                min="0"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Activity Cost ($)</label>
              <input
                type="number"
                name="activityCost"
                value={formData.breakdown.activityCost}
                onChange={handleBreakdownChange}
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Tax ($)</label>
              <input
                type="number"
                name="tax"
                value={formData.breakdown.tax}
                onChange={handleBreakdownChange}
                min="0"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Discount ($)</label>
            <input
              type="number"
              name="discount"
              value={formData.breakdown.discount}
              onChange={handleBreakdownChange}
              min="0"
            />
          </div>
        </section>

        <section className="payment-method">
          <h2>Payment Method</h2>

          <div className="form-group">
            <label>Select Payment Method *</label>
            <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
              {paymentMethods.map((method) => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          </div>

          {formData.paymentMethod === 'Credit Card' && (
            <>
              <div className="form-row">
                <input type="text" placeholder="Cardholder Name" required />
                <input type="text" placeholder="Card Number" maxLength="16" required />
              </div>
              <div className="form-row">
                <input type="text" placeholder="MM/YY" maxLength="5" required />
                <input type="text" placeholder="CVV" maxLength="4" required />
              </div>
            </>
          )}

          {formData.paymentMethod === 'UPI' && (
            <input type="text" placeholder="UPI ID (user@bank)" required />
          )}

          {formData.paymentMethod === 'Net Banking' && (
            <select required>
              <option value="">Select Your Bank</option>
              <option value="HDFC">HDFC Bank</option>
              <option value="ICIC">ICIC Bank</option>
              <option value="SBI">SBI Bank</option>
            </select>
          )}
        </section>

        <section className="total-amount">
          <h2>Total Amount: ${calculateTotal().toFixed(2)}</h2>
        </section>

        <button type="submit" disabled={loading} className="submit-btn payment-btn">
          {loading ? 'Processing Payment...' : '✓ Complete Payment'}
        </button>
      </form>
    </div>
  );
}

export default PaymentGateway;
