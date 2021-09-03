import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadBalance, updateBalance, addTransaction } from "../../actions/wallet";

import { Input, Button, Header, Table, Container } from "semantic-ui-react";
import uniqid from 'uniqid';


const WalletComponent = () => {
  const { balance, history } = useSelector((state) => state.wallet);

  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  useEffect(() => {
    dispatch(loadBalance());
  }, [dispatch]);

  const handleBalance = () => {
    dispatch(updateBalance(value));
    dispatch(addTransaction(value, '',  uniqid()));
    dispatch(loadBalance());
    setValue("");
  };

  const renderTransactions = history.map((transaction, index) => (
    <Table.Row key={index}>
      <Table.Cell textAlign="left">{transaction.id}</Table.Cell>
      <Table.Cell singleLine>{transaction.text}</Table.Cell>
    </Table.Row>
  ));

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
      {history.length > 0 ? (
        <Container
          textAlign="center"
          style={{ width: "50%", marginTop: "80px" }}
        >
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>{renderTransactions}</Table.Body>
          </Table>
        </Container>
      ) : (
        <Header as="h3">There is no transactions.</Header>
      )}
    </div>
  );
};

export default WalletComponent;
