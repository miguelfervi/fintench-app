import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  loadBalance,
  updateBalance,
  addTransaction,
} from "../../actions/wallet";
import uniqid from "uniqid";

import { Input, Button, Header } from "semantic-ui-react";

const TransactionSender = () => {
  const { balance } = useSelector((state) => state.wallet);

  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(loadBalance());
  }, [dispatch]);

  const handleBalance = () => {
    console.log(value, name);
    dispatch(updateBalance(value));
    dispatch(addTransaction(value, name, uniqid()));
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

  const handleName = (e) => {
    setName(e.target.value);
  };

  return (
    <div>
      <Header as="h1">Your Wallet</Header>
      <div>
        Your balance<Header as="h1"> ${balance}</Header>
      </div>
      {balance > 0 ? (
        <div>
          <Header as="h5">Introduce a name and a quantity to transfer</Header>
          <Input
            type="text"
            value={name}
            onChange={handleName}
            placeholder="Introduce a name"
          />
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
      ) : (
        <div>You need to have balance</div>
      )}
    </div>
  );
};

export default TransactionSender;
