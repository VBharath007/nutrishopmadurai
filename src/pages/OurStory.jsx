import React, { useEffect } from 'react';
import WhyChooseUs from '../components/WhyChooseUs';
import FarmToTable from '../components/FarmToTable';

import './OurStory.css';

const OurStory = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="our-story-page">


      <WhyChooseUs />
      <FarmToTable />

    </div>
  );
};

export default OurStory;
