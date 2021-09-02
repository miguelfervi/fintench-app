import WalletComponent from './WalletComponent';
import classes from './Wallet.module.css';

const Wallet = () => {
  return (
    <section className={classes.profile}>
      <h1>Your Wallet</h1>
      <WalletComponent />
    </section>
  );
};

export default Wallet;
