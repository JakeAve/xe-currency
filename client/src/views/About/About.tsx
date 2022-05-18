import { useLanguageContext } from '../../providers/LanguageProvider';

const About = (): JSX.Element => {
  const { strings: translatedStrings } = useLanguageContext();

  return (
    <section className="view-container">
      <h2>{translatedStrings.aboutTitle}</h2>
      <p>{translatedStrings.aboutText}</p>
    </section>
  );
};

export default About;
