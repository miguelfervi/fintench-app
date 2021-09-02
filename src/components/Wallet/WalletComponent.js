import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadBalance, updateBalance } from "../../actions/wallet";

const Wallet = () => {
  const { balance } = useSelector((state) => state.wallet);
  const dispatch = useDispatch();
  console.log(balance);

  useEffect(() => {
    dispatch(loadBalance());
  }, [dispatch]);

  const handleBalance = () => {
    dispatch(updateBalance(1000));
    dispatch(loadBalance());
  }
  return (
    <div>
      Your balance <p>{balance}</p>
      <button onClick={handleBalance}>Update</button>
    </div>
  );
};

export default Wallet;
