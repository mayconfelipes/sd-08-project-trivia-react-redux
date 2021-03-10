import React from 'react';
import Header from '../components/Header';
import FeedbackMessage from '../components/FeedbackMessage';

class Feedback extends React.Component {
  render() {
    return (
      <>
        <Header />
        <FeedbackMessage />
      </>
    );
  }
}

export default Feedback;
