const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendOrderConfirmation = async (userEmail, orderDetails) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Order Confirmation - PharmaCare',
    html: `
      <h2>Thank you for your order!</h2>
      <p>Order ID: ${orderDetails.orderId}</p>
      <p>Total Amount: $${orderDetails.totalPrice}</p>
      <p>Your order has been received and is being processed.</p>
      <p>You will receive another email when your order is shipped.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email send error:', error);
  }
};

const sendOrderStatusUpdate = async (userEmail, orderId, status) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: `Order Status Update - PharmaCare`,
    html: `
      <h2>Order Status Update</h2>
      <p>Order ID: ${orderId}</p>
      <p>Status: <strong>${status.toUpperCase()}</strong></p>
      <p>Thank you for shopping with PharmaCare!</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email send error:', error);
  }
};

const sendPrescriptionVerification = async (userEmail, status) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Prescription Verification - PharmaCare',
    html: `
      <h2>Prescription Verification Update</h2>
      <p>Your prescription has been ${status}.</p>
      ${status === 'verified' ? '<p>You can now order prescription medicines.</p>' : '<p>Please upload a valid prescription.</p>'}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email send error:', error);
  }
};

module.exports = {
  sendOrderConfirmation,
  sendOrderStatusUpdate,
  sendPrescriptionVerification
};