import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadBalance } from "../../actions/wallet";

import { Header } from "semantic-ui-react";

const BalanceComponent = () => {
  const { balance } = useSelector((state) => state.wallet);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadBalance());
  }, [dispatch]);

  return (
    <div data-testid="balance">
      <Header as="h1">Your Wallet</Header>
      <div>
        Your balance<Header as="h1"> ${balance}</Header>
      </div>
    </div>
  );
};

export default BalanceComponent;
