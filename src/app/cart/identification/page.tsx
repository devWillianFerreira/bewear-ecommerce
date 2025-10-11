import OrderSteps from "../components/order-steps";
import Adress from "./components/address";

const Identification = () => {
  return (
    <div className="space-y-5 px-5">
      <OrderSteps hasIdentification={true} hasPayment={false} />
      <div className="grid grid-cols-1 lg:grid-cols-[s2fr_1fr]">
        <div className="space-y-6 rounded-lg border p-3">
          <h1 className="text-xl font-semibold">Identificação</h1>
          <Adress />
        </div>
      </div>
    </div>
  );
};

export default Identification;
