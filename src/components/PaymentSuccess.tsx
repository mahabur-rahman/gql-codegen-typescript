import { useParams } from "react-router-dom";

function PaymentSuccess() {
  const {transactionId} = useParams();
  return (
    <div>
      <h1 className="font-bold text-center text-red-500">
        Thank you for your order. Your payment has been processed successfully.
      </h1>

      <p className="mt-4 text-center">TransactionId: {transactionId}</p>
    </div>
  );
}

export default PaymentSuccess;
