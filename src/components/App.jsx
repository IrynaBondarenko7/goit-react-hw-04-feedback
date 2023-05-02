import { useState } from 'react';
import PropTypes from 'prop-types';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Layout } from './Layout/Layout';
import { Section } from './Section/Section';
import { Statistic } from './Statistic/Statistic';
import { Notification } from './Notification/Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const updateStatistic = value => {
    switch (value) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;
      default:
        return;
    }
  };

  const countTotalFeedback = () => {
    let total = good + bad + neutral;
    return total;
  };
  const countPositiveFeedbackPercentage = () => {
    const totalValue = countTotalFeedback();
    let positiveValaue = Math.round((good * 100) / totalValue) || 0;
    return positiveValaue;
  };

  const total = countTotalFeedback();
  const positiveValaue = countPositiveFeedbackPercentage();

  const optionsObject = { good: good, neutral: neutral, bad: bad };
  const options = Object.keys(optionsObject);

  return (
    <Layout>
      <Section title={'Please leave feedback'}>
        <FeedbackOptions options={options} onLeaveFeedback={updateStatistic} />
        {total >= 1 ? (
          <Statistic
            result={optionsObject}
            options={options}
            total={total}
            positivePercentage={positiveValaue}
          />
        ) : (
          <Notification message="There is no feedback"></Notification>
        )}
      </Section>
    </Layout>
  );
};
Section.propTypes = {
  title: PropTypes.string.isRequired,
};
FeedbackOptions.propTypes = {
  options: PropTypes.array.isRequired,
};
Statistic.propTypes = {
  result: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  total: PropTypes.number,
  positivePercentage: PropTypes.number,
};
