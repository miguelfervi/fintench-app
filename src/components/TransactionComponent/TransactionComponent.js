import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import uniqid from "uniqid";

import {
  loadBalance,
  retireBalance,
  addTransaction,
} from "../../actions/wallet";

import { Input, Button, Header } from "semantic-ui-react";
import BalanceComponent from "../BalanceComponent/BalanceComponent";

const TransactionComponent = () => {
  const { balance } = useSelector((state) => state.wallet);

  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    dispatch(loadBalance());
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      setSuccess(false);
      setValue("");
      setName("");
    }, 500);
  }, [balance]);

  const handleBalance = () => {
    dispatch(retireBalance(value));
    dispatch(addTransaction(value, name, uniqid()));
    setSuccess(true);
    dispatch(loadBalance());
  };

  const handleInput = (e) => {
    if (e.target.value !== "") {
      const isGreaterThan = balance < Math.abs(e.target.value);

      !isGreaterThan && balance > 0
        ? setValue(parseInt(e.target.value))
        : setValue(balance);
    } else {
      e.target.value === "" ? setValue("") : setValue(parseInt(e.target.value));
    }
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const isDisabled =
    value === 0 ||
    value === "" ||
    Math.abs(value) > Math.abs(balance) ||
    (name === "" && value === 0) ||
    value === 0;

  const sendCredit = () => (
    <React.Fragment>
      {" "}
      <Input
        type="text"
        value={name}
        onChange={handleName}
        placeholder="Introduce a name"
      />
      <Input
        type="number"
        style={{ marginLeft: "20px" }}
        onChange={handleInput}
        value={value}
        placeholder="Introduce a quantity"
      />
      <Button
        style={{ marginLeft: "20px" }}
        color="purple"
        onClick={handleBalance}
        disabled={isDisabled}
      >
        Update
      </Button>
    </React.Fragment>
  );

  return (
    <div>
      <BalanceComponent />
      <div>
        <Header as="h5" style={{ marginTop: "40px", marginBottom: "40px" }}>
          Introduce a name and a quantity to transfer
        </Header>
        {sendCredit()}
      </div>
      {balance === 0 && (
        <Header
          as="h5"
          style={{
            marginTop: "10px",
            padding: "10px",
            color: "red",
          }}
        >
          You need entered some money in Wallet page
        </Header>
      )}
      {success && (
        <Header
          as="h5"
          style={{
            marginTop: "10px",
            padding: "10px",
            color: "green",
          }}
        >
          The transaction was correctly completed
        </Header>
      )}
    </div>
  );
};

export default TransactionComponent;
