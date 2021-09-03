import WalletComponent from "./WalletComponent";
import { Container } from "semantic-ui-react";

const Wallet = () => {
  return (
    <Container textAlign="center" style={{ marginTop: "40px" }}>
      <h1>Your Wallet</h1>
      <WalletComponent />
    </Container>
  );
};

export default Wallet;
