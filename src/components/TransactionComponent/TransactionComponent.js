import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import uniqid from "uniqid";

import {
  loadBalance,
  updateBalance,
  addTransaction,
} from "../../actions/wallet";

import { Input, Button, Header, Container } from "semantic-ui-react";

const TransactionComponent = () => {
  const { balance } = useSelector((state) => state.wallet);

  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setSuccess(false);
    dispatch(loadBalance());
  }, [dispatch]);

  const handleBalance = () => {
    dispatch(updateBalance(value));
    dispatch(addTransaction(value, name, uniqid()));
    setSuccess(true);
    dispatch(loadBalance());
    setValue("");
  };

  const handleInput = (e) => {
    setError(false);
    if (e.target.value.charAt(0) !== "-" && e.target.value !== "") {
      setError(true);
      setValue("");
    } else {
      setError(false);
      setValue(parseInt(e.target.value));
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
          <Header as="h5" style={{ marginTop: "40px", marginBottom: "40px" }}>
            Introduce a name and a quantity to transfer using negative symbol
            (-)
          </Header>
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
            disabled={
              value === 0 ||
              value === "" ||
              Math.abs(value) > Math.abs(balance) ||
              (name === "" && value === 0) ||
              value === 0
            }
          >
            Update
          </Button>
        </div>
      ) : (
        <div>You need to have balance</div>
      )}
      <Container textAlign="center">
        {balance < value && (
          <Header
            as="h5"
            style={{
              marginTop: "10px",
              padding: "10px",
              color: "red",
            }}
          >
            You need to pay the money that you have
          </Header>
        )}
        {error && (
          <Header textAlign="center"
            as="h5"
            style={{
              marginTop: "10px",
              padding: "10px",
              color: "red",
            }}
          >
            You need put the quantity correctly
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
          >{`You send some money correctly`}</Header>
        )}
      </Container>
    </div>
  );
};

export default TransactionComponent;
