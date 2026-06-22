"use client";

import { useState } from "react";

/* ===== قسم التواصل والنشرة البريدية ===== */
export default function Contact() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [contactSent, setContactSent] = useState(false);
  const [newsletterSent, setNewsletterSent] = useState(false);

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterSent(true);
  };

  return (
    <section
      id="contact"
      className="bg-[#111111] py-20 lg:py-28 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">

          {/* ===== النشرة البريدية ===== */}
          <div>
            <h2
              className="text-2xl lg:text-3xl font-bold text-white mb-3"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              اشترك في النشرة البريدية
            </h2>
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-12 h-px bg-gradient-to-l from-gold to-transparent" />
              <span className="text-gold text-sm">◈</span>
            </div>
            <p
              className="text-white/55 text-sm leading-loose mb-8"
              style={{ fontFamily: "var(--font-ibm)" }}
            >
              اشترك ليصلك كل جديد من قصائد وخواطر الشاعر مباشرة إلى بريدك الإلكتروني
            </p>

            {newsletterSent ? (
              <div className="flex items-center gap-3 py-4 px-5 bg-gold/10 border border-gold/30 rounded">
                <span className="text-gold text-xl">✓</span>
                <p className="text-gold text-sm" style={{ fontFamily: "var(--font-ibm)" }}>
                  شكراً! تم تسجيل بريدك بنجاح
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/15 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-gold/50"
                  style={{ fontFamily: "var(--font-ibm)" }}
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-gold text-charcoal font-bold hover:bg-gold-light transition-colors text-sm"
                  style={{ fontFamily: "var(--font-cairo)" }}
                  aria-label="اشتراك"
                >
                  ✈
                </button>
              </form>
            )}
          </div>

          {/* ===== نموذج التواصل ===== */}
          <div>
            <h2
              className="text-2xl lg:text-3xl font-bold text-white mb-3"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              تواصل معي
            </h2>
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-12 h-px bg-gradient-to-l from-gold to-transparent" />
              <span className="text-gold text-sm">◈</span>
            </div>
            <p
              className="text-white/55 text-sm leading-loose mb-8"
              style={{ fontFamily: "var(--font-ibm)" }}
            >
              يمكنك إرسال رسالتك وسأرد عليك في أقرب وقت
            </p>

            {contactSent ? (
              <div className="flex items-center gap-3 py-4 px-5 bg-gold/10 border border-gold/30 rounded">
                <span className="text-gold text-xl">✓</span>
                <p className="text-gold text-sm" style={{ fontFamily: "var(--font-ibm)" }}>
                  شكراً! تم إرسال رسالتك بنجاح
                </p>
              </div>
            ) : (
              <form onSubmit={handleContact} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="الاسم"
                    required
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, name: e.target.value })
                    }
                    className="bg-white/5 border border-white/15 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-gold/50"
                    style={{ fontFamily: "var(--font-ibm)" }}
                  />
                  <input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    required
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                    className="bg-white/5 border border-white/15 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-gold/50"
                    style={{ fontFamily: "var(--font-ibm)" }}
                  />
                </div>
                <textarea
                  placeholder="رسالتك..."
                  required
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, message: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/15 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-gold/50 resize-none"
                  style={{ fontFamily: "var(--font-ibm)" }}
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-gold text-charcoal font-bold hover:bg-gold-light transition-colors text-sm flex items-center justify-center gap-2"
                  style={{ fontFamily: "var(--font-cairo)" }}
                >
                  ✉ إرسال رسالة
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
