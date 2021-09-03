import TransactionComponent from "../components/TransactionComponent/TransactionComponent";
import { Container } from "semantic-ui-react";

const SendPage = () => {
  return (
    <Container textAlign="center" style={{ marginTop: "40px" }}>
      <TransactionComponent />
    </Container>
  );
};

export default SendPage;
