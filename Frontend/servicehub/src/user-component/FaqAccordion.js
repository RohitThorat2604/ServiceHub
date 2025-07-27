import React from 'react';

export default function FaqAccordion() {
  const faqs = [
    {
      question: "How can I book a service?",
      answer: "To book a service, simply browse the categories, select a provider, choose your preferred date/time, and submit the booking form.",
    },
    {
      question: "Can i select a service provider?",
      answer: "You can select a provider for the particular Service.",
    },
  
    {
      question: "Will i know about my requests?",
      answer: "We will review and approve or reject your request. You'll be notified once the status is updated.",
    },
  ];

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center"><i class="bi bi-question-lg text-danger"></i> Frequently Asked Questions</h2>
      <div className="accordion" id="faqAccordion">
        {faqs.map((faq, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header" id={`faqHeading${index}`}>
              <button
                className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#faqCollapse${index}`}
                aria-expanded={index === 0 ? 'true' : 'false'}
                aria-controls={`faqCollapse${index}`}
              >
                {faq.question}
              </button>
            </h2>
            <div
              id={`faqCollapse${index}`}
              className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
              aria-labelledby={`faqHeading${index}`}
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
