"use client";

import React, { useState } from "react";
import { faqs } from "@/data/faqs";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">

      <div className="faq-list">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`faq-item ${isOpen ? "open" : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              {/* Question row */}
              <div className="faq-question">
                <h3 className="faq-question-text">{faq.question}</h3>
                <span className="faq-toggle">{isOpen ? "▲" : "▼"}</span>
              </div>

              {/* Animated dropdown answer */}
              <div className={`faq-answer ${isOpen ? "open" : ""}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .faq-section {
          width: 80%;
          margin: 0 auto;
          padding: 3rem 0;
        }

        .faq-title {
          text-align: center;
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 2rem;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .faq-item {
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          background-color: #f3f3f3;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .faq-item.open {
          background-color: #ffe5e5;
        }

        .faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
        }

        .faq-question-text {
          font-size: 1.125rem;
          font-weight: 500;
          transition: color 0.3s;
          color: #333;
        }

        .faq-item.open .faq-question-text {
          color: #b91c1c; /* red-700 equivalent */
        }

        .faq-toggle {
          font-size: 1.25rem;
        }

        .faq-answer {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          padding: 0 1.5rem;
          transition: all 0.5s ease-in-out;
        }

        .faq-answer.open {
          max-height: 1000px; /* arbitrarily large to allow content to expand */
          opacity: 1;
          padding-bottom: 1rem;
        }

        .faq-answer p {
          color: #4b5563; /* gray-700 equivalent */
          margin: 0;
        }
      `}</style>
    </section>
  );
};

export default Faq;
