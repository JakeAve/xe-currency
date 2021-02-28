import './styles.scss';

const Footer = (): JSX.Element => {
  return (
    <footer>
      <div className="copyright">&copy; {new Date().getFullYear()} XE-Currency</div>
    </footer>
  );
};

export default Footer;
