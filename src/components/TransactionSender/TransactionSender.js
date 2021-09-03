import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadBalance, updateBalance } from "../../actions/wallet";

import { Input, Button, Header } from "semantic-ui-react";

const TransactionSender = () => {
  const { balance } = useSelector((state) => state.wallet);

  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  useEffect(() => {
    dispatch(loadBalance());
  }, [dispatch]);

  const handleBalance = () => {
    dispatch(updateBalance(value));
    dispatch(loadBalance());
    setValue("");
  };

  const handleInput = (e) => {
    if (e.target.value !== "" && e.target.value.charAt(0) === "-") {
      const isGreaterThan = balance < Math.abs(e.target.value);

      !isGreaterThan && balance > 0
        ? setValue(parseInt(e.target.value))
        : setValue(-balance);
    } else {
      e.target.value === "" ? setValue("") : setValue(parseInt(e.target.value));
    }
  };

  return (
    <div>
      <Header as="h1">Your Wallet</Header>
      <div>
        Your balance<Header as="h1"> ${balance}</Header>
      </div>
      <Header as="h5">Introduce a quantity to deposit</Header>
      <Input
        type="number"
        onChange={handleInput}
        value={value}
        placeholder="Introduce a quantity"
      />
      <Button
        style={{ marginLeft: "10px" }}
        color="purple"
        onClick={handleBalance}
        disabled={value === 0 || value === ""}
      >
        Update
      </Button>
    </div>
  );
};

export default TransactionSender;
