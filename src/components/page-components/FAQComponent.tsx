"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import "./FAQComponent.css";

const faqs = [
    [
        "What kind of businesses do you work with?",
        "Ceasiun supports traditional, growing and international businesses that need a dependable digital partner—from their first launch to ongoing technical operations.",
    ],
    [
        "How do you decide what to recommend?",
        "Services are selected according to your business requirements, current situation and final goals. We do not add unnecessary services or force you into irrelevant solutions.",
    ],
    [
        "How do projects begin?",
        "Every project starts with a conversation about the objective, current situation and desired outcome. From there, we define scope, milestones and a clear next step.",
    ],
    [
        "How are payments structured?",
        "Projects require a 30% advance followed by milestone-based payments. Local and international payment methods are available.",
    ],
];

const faqGroups = [
    { label: "General", items: faqs.slice(0, 2) },
    {
        label: "Services",
        items: [
        [
            "How do projects begin?",
            "Every project starts with a conversation about the objective, current situation and desired outcome. From there, we define scope, milestones and a clear next step.",
        ],
        ],
    },
    { label: "Payments", items: [faqs[3]] },
];

export function FAQComponent() {
    const categories = Object.fromEntries(
        faqGroups.map((group, index) => [String(index), group.label])
    );
    const faqData = Object.fromEntries(
        faqGroups.map((group, index) => [
        String(index),
        group.items.map(([question, answer]) => ({ question, answer })),
        ])
    );
    const categoryKeys = Object.keys(categories);
    const [selectedCategory, setSelectedCategory] = useState(categoryKeys[0] ?? "");
    const questions = faqData[selectedCategory] ?? [];

    return (
        <section id="faq" className="new-section faq-section">
        
            <div className="faq-system faq-tabs-component" aria-label="Before we begin.">
            <div className="faq-header">
                <span className="eyebrow">Questions, answered</span>
                <h2>Frequently Asked Question</h2>
                <span className="faq-orbit" aria-hidden="true" />
            </div>
            <div className="faq-tabs" role="tablist" aria-label="FAQ categories">
                {categoryKeys.map((key) => (
                <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={selectedCategory === key}
                    className={selectedCategory === key ? "is-active" : ""}
                    onClick={() => setSelectedCategory(key)}
                >
                    <span>{categories[key]}</span>
                    <b>{String(faqData[key]?.length ?? 0).padStart(2, "0")}</b>
                    <AnimatePresence>
                    {selectedCategory === key && (
                        <motion.i
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.35 }}
                        />
                    )}
                    </AnimatePresence>
                </button>
                ))}
            </div>
            <div
                className="faq-list"
                role="tabpanel"
                aria-label={`${categories[selectedCategory] ?? "FAQ"} questions`}
            >
                <AnimatePresence mode="wait">
                <motion.div
                    key={selectedCategory}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.1 }}
                >
                    {questions.map((faq, index) => (
                    <FAQItem key={faq.question} question={faq.question} answer={faq.answer} index={index} />
                    ))}
                </motion.div>
                </AnimatePresence>
            </div>
            </div>
        
        </section>
    );
}

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <motion.div
            className={`faq-item ${isOpen ? "is-open" : ""}`}
            animate={isOpen ? "open" : "closed"}
            onClick={() => setIsOpen((value) => !value)}
            role="button"
            tabIndex={0}
            aria-expanded={isOpen}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsOpen((value) => !value);
                }
            }}
        >
            <div className="faq-question-row">
                <span>{(index + 1) + ". " + question}</span>
                <motion.span
                    className="faq-icon-wrap"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.1 }}
                >
                    <Plus aria-hidden="true" />
                </motion.span>
            </div>
            <motion.div
                initial={false}
                animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                }}
                transition={{ duration: 0.1 }}
                className="faq-answer-wrap"
            >
                <p>{answer}</p>
            </motion.div>
        </motion.div>
    );
}

export default FAQComponent;