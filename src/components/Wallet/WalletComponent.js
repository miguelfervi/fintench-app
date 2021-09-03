import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  loadBalance,
  updateBalance,
  addTransaction,
} from "../../actions/wallet";

import { Input, Button, Header } from "semantic-ui-react";
import uniqid from "uniqid";
import TableComponent from "../Table/TableComponent";
import BalanceComponent from "../BalanceComponent/BalanceComponent";

const WalletComponent = () => {
  const { balance, history } = useSelector((state) => state.wallet);

  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  useEffect(() => {
    dispatch(loadBalance());
  }, [dispatch]);

  const handleBalance = () => {
    dispatch(updateBalance(value));
    dispatch(addTransaction(value, "", uniqid()));
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
      <BalanceComponent />
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
     <TableComponent data={history} />
    </div>
  );
};

export default WalletComponent;
