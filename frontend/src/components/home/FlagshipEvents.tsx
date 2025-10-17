import React from 'react';
import styles from './FlagshipEvents.module.css';

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
  imagePosition: 'left' | 'right';
}

const FlagshipEvents = () => {
  const events: Event[] = [
    {
      id: 1,
      title: "Name of the Event",
      date: "Apr 8, 2021",
      description: "Every opinion UX/UI designer is the foundation of a product, so first and said You can create an infinitely high-quality brand, and recognize the simulation of breathing, but we aren't fail in love with a product just because its heart beats in an interesting rhythm or its breathing smells like mint.",
      imagePosition: 'left'
    },
    {
      id: 2,
      title: "Name of the Event",
      date: "Apr 8, 2021",
      description: "In my opinion UX/UI designer is the foundation of a product, so first and said You can create an infinitely high-quality brand, and recognize the simulation of breathing, but we aren't fail in love with a product just because its heart beats in an interesting rhythm or its breathing smells like mint.",
      imagePosition: 'right'
    }
  ];

  const renderEventCard = (event: Event) => (
    <div key={event.id} className={`${styles.eventCard} ${styles[event.imagePosition]}`}>
      <div className={styles.imageContainer}>
        <div className={styles.mountainImage}>
          <div className={styles.mountainPeak}></div>
          <div className={styles.mountainBase}></div>
        </div>
      </div>
      <div className={styles.eventContent}>
        <h3 className={styles.eventTitle}>{event.title}</h3>
        <div className={styles.eventDate}>
          <span className={styles.calendarIcon}>📅</span>
          <span>{event.date}</span>
        </div>
        <p className={styles.eventDescription}>{event.description}</p>
        <p className={styles.additionalText}>
          Most of the information we perceive is through our eyes, which means that we see first and then think. 
          Therefore, we must understand how to attract attention and perceive it in a way that the user performs the 
          necessary actions [...]
        </p>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Flagship Events</h1>
      </header>
      <div className={styles.eventsContainer}>
        {events.map(renderEventCard)}
      </div>
    </div>
  );
};

export default FlagshipEvents;