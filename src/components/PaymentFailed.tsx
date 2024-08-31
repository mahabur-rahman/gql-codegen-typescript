import { useParams } from "react-router-dom";

function PaymentFailed() {
  const { transactionId } = useParams();
  return (
    <div>
      <h1 className="font-bold text-center text-red-500">
        Payment Failed! Please try again.
      </h1>

      <p className="mt-4 text-center">TransactionId: {transactionId}</p>
    </div>
  );
}

export default PaymentFailed;
