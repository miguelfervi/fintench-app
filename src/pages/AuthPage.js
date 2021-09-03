import AuthForm from "../components/Auth/AuthForm";
import { Container } from "semantic-ui-react";

const AuthPage = () => {
  return (
    <Container align="center" style={{ marginTop: "80px" }}>
      <AuthForm />
    </Container>
  );
};

export default AuthPage;
