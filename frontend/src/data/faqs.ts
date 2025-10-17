// data/faq.ts

export type FAQItem = {
  question: string;
  answer: string;
};

export const faqs: FAQItem[] = [
  {
    question: "What is NSS IIIT-H?",
    answer:
      "NSS (National Service Scheme) at IIIT Hyderabad is a student-led initiative aimed at community service, awareness campaigns, and social responsibility.",
  },
  {
    question: "How can I join NSS IIIT-H?",
    answer:
      "Students can register during the recruitment drives announced at the start of each academic year or contact the NSS coordinators.",
  },
  {
    question: "What kind of activities does NSS organize?",
    answer:
      "NSS IIIT-H organizes cleanliness drives, blood donation camps, teaching initiatives, awareness campaigns, and more.",
  },
  {
    question: "Is participation in NSS mandatory?",
    answer:
      "No, participation is voluntary. However, joining NSS offers great opportunities to serve the community and develop leadership skills.",
  },
];
