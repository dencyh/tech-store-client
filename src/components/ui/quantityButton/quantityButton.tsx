import React from "react";

interface Props {
  quantity: number;
  increment: () => void;
  decrement: () => void;
}
const QuantityButton: React.FC<Props> = () => {
  return (
    <div>
      <h1>QuantityButton</h1>
    </div>
  );
};
export default QuantityButton;
