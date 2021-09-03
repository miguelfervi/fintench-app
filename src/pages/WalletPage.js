import WalletComponent from "../components/Wallet/WalletComponent";

import { Container } from "semantic-ui-react";

const WalletPage = () => {
  return (
    <Container textAlign="center" style={{ marginTop: "40px" }}>
      <WalletComponent />
    </Container>
  );
};

export default WalletPage;
