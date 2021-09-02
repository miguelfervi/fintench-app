import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadBalance, updateBalance } from "../../actions/wallet";

const Wallet = () => {
  const { balance, history } = useSelector((state) => state.wallet);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadBalance());
  }, [dispatch]);

  const handleBalance = () => {
    dispatch(updateBalance(500));
    dispatch(loadBalance());
  };

  const renderTransactions = history.map((transaction, index) => (
    <div key={index}>
      <div>ID: {transaction.id}</div>
      <div>{transaction.text}</div>
    </div>
  ));

  return (
    <div>
      Your balance<p> ${balance}</p>
      <button onClick={handleBalance}>Update</button>
      {renderTransactions}
    </div>
  );
};

export default Wallet;
