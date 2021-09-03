import TransactionSender from "./../components/TransactionSender/TransactionSender";
import { Container } from "semantic-ui-react";

const SendPage = () => {
  return (
    <Container textAlign="center" style={{ marginTop: "40px" }}>
      <TransactionSender />
    </Container>
  );
};

export default SendPage;
