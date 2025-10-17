import React from 'react';
import styles from './VolunteerReg.module.css';

const VolunteerReg = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Join Us!</h1>
      
      <div className={styles.stepsContainer}>
        <div className={styles.step}>
          <h2 className={styles.stepTitle}>STEP 1</h2>
          <p className={styles.stepDescription}>
            Register as a volunteer on the{' '}
            <a href="https://mybharat.gov.in/" target='_blank' className={styles.link}>
              MyBharat portal
            </a>
            .
          </p>
        </div>
        
        <div className={styles.step}>
          <h2 className={styles.stepTitle}>STEP 2</h2>
          <p className={styles.stepDescription}>
            Fill the{' '}
            <a href="https://forms.cloud.microsoft/pages/responsepage.aspx?id=vDsaA3zPK06W7IZ1VVQKHJoDdm6dAj9NvMDyKNlznNdUN01EWFdDRkhYUzlUTzBHNVRKM05SQU5ZQy4u&route=shorturl" target='_blank' className={styles.link}>
              registration form
            </a>
            {' '}with all the necessary details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VolunteerReg;