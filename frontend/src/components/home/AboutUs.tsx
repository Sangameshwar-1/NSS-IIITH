import React from "react";
import styles from "./AboutUs.module.css";

const AboutUs = () => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {/* LEFT */}
        <div className={styles.left}>
          <div className={styles.leftInner}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.
            </p>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>

            <h2>Our Mission</h2>
            <div>
              <p>
                At NSS, our mission is to promote active citizenship and community engagement, fostering positive change. In addition to organizing impactful activities like Blood Donation Camps, Plantation Drives, and Cloth Donation Drives, we have a wide array of events such as School and Orphanage visits, Campus Beautification, Daan Utsav, Self Defense, and Yoga Day. These are just a glipse; we host numerous other activities. Our commitment extends beyond these, aiming to provide diverse opportunities for individuals to contribute meaningfully to the society. Join us in this journey of service and exploration, where we have more events, more opportunities, and more ways to make a positive impact.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div
          className={styles.right}
          style={{ backgroundImage: "url('/carosel-imgs/about_us.jpg')" }}
        >
          <div className={styles.overlay} />
          <div className={styles.rightContent}>
            <h1>Work for Cause,</h1>
            <h2>Not for Applause.</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;