  import { useEffect, useState } from "react";
  import { motion, AnimatePresence } from "framer-motion";
  import emailjs from "@emailjs/browser";

function ProjectForm({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    details: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    const form = e.currentTarget;

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      );

      setSubmitted(true);

      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        details: "",
      });
    } catch (error) {
      console.error("Email failed:", error);

      alert(
        "Something went wrong while sending your request. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // ...
  }, [isOpen, onClose]);

    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";
      }

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }, [isOpen, onClose]);

    const handleChange = (e) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };


    const handleClose = () => {
      setSubmitted(false);

      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        details: "",
      });

      onClose();
    };

    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* BACKDROP */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleClose}
              className="
                fixed
                inset-0
                z-[90]
                bg-black/20
                backdrop-blur-[2px]
              "
            />

            {/* DRAWER */}

            <motion.aside
              data-lenis-prevent
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                fixed
                right-0
                top-0
                z-[100]
                h-dvh
                w-full
                overflow-y-auto
                overscroll-contain
                bg-[#f5f5f5]
                text-black
                md:w-[760px]
              "
            >
              <div className="px-6 py-8 md:px-14 md:py-12">

                {/* TOP BAR */}

                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-black/40">
                    05 — Contact
                  </span>

                  <button
                    onClick={handleClose}
                    className="
                      text-sm
                      transition-opacity
                      duration-300
                      hover:opacity-50
                    "
                  >
                    Close
                  </button>
                </div>

                <AnimatePresence mode="wait">

                  {/* ================= FORM ================= */}

                  {!submitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.35 }}
                    >

                      {/* HEADER */}

                      <div className="mt-16 md:mt-20">

                        <h2
                          className="
                            max-w-3xl
                            font-space
                            text-4xl
                            font-medium
                            leading-[0.95]
                            tracking-[-0.055em]
                            md:text-6xl
                          "
                        >
                          Request a project
                        </h2>

                        <p
                          className="
                            mt-7
                            max-w-2xl
                            text-base
                            leading-relaxed
                            text-black/50
                            md:text-xl
                          "
                        >
                          Tell me a little about your project. Simply fill
                          out the form or send me an{" "}
                          <a
                            href="mailto:your@email.com"
                            className="text-black underline underline-offset-4"
                          >
                            email
                          </a>{" "}
                          — I&apos;ll get back to you.
                        </p>

                      </div>

                      {/* FORM */}

                      <form
                        onSubmit={handleSubmit}
                        className="mt-16 md:mt-20"
                      >

                        {/* NAME + COMPANY */}

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                          <div className="rounded-xl bg-white p-6">

                            <label
                              htmlFor="name"
                              className="block text-xs font-medium"
                            >
                              Name{" "}
                              <span className="text-black/40">*</span>
                            </label>

                            <input
                              id="name"
                              name="name"
                              type="text"
                              required
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="First name / Last name"
                              className="
                                mt-5
                                w-full
                                bg-transparent
                                text-lg
                                outline-none
                                placeholder:text-black/35
                              "
                            />

                          </div>

                          <div className="rounded-xl bg-white p-6">

                            <label
                              htmlFor="company"
                              className="block text-xs font-medium"
                            >
                              Company
                            </label>

                            <input
                              id="company"
                              name="company"
                              type="text"
                              value={formData.company}
                              onChange={handleChange}
                              placeholder="Your company"
                              className="
                                mt-5
                                w-full
                                bg-transparent
                                text-lg
                                outline-none
                                placeholder:text-black/35
                              "
                            />

                          </div>

                        </div>

                        {/* EMAIL + PHONE */}

                        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">

                          <div className="rounded-xl bg-white p-6">

                            <label
                              htmlFor="email"
                              className="block text-xs font-medium"
                            >
                              E-mail{" "}
                              <span className="text-black/40">*</span>
                            </label>

                            <input
                              id="email"
                              name="email"
                              type="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="Your email address"
                              className="
                                mt-5
                                w-full
                                bg-transparent
                                text-lg
                                outline-none
                                placeholder:text-black/35
                              "
                            />

                          </div>

                          <div className="rounded-xl bg-white p-6">

                            <label
                              htmlFor="phone"
                              className="block text-xs font-medium"
                            >
                              Phone
                            </label>

                            <input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="Your phone number"
                              className="
                                mt-5
                                w-full
                                bg-transparent
                                text-lg
                                outline-none
                                placeholder:text-black/35
                              "
                            />

                          </div>

                        </div>

                        {/* PROJECT DETAILS */}

                        <div className="mt-4 rounded-xl bg-white p-6">

                          <label
                            htmlFor="details"
                            className="block text-xs font-medium"
                          >
                            Project details{" "}
                            <span className="text-black/40">*</span>
                          </label>

                          <textarea
                            id="details"
                            name="details"
                            required
                            rows={7}
                            value={formData.details}
                            onChange={handleChange}
                            placeholder="Briefly describe your project"
                            className="
                              mt-5
                              w-full
                              resize-none
                              bg-transparent
                              text-lg
                              leading-relaxed
                              outline-none
                              placeholder:text-black/35
                            "
                          />

                        </div>

                        {/* SUBMIT */}

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="
                            group
                            mt-6
                            flex
                            h-14
                            w-full
                            items-center
                            justify-center
                            gap-3
                            rounded-xl
                            bg-black
                            text-sm
                            font-medium
                            text-white
                            transition-all
                            duration-300
                            hover:bg-black/80
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                          "
                        >
                          {isSubmitting ? (
                            <>
                              Sending
                              <span className="animate-pulse">...</span>
                            </>
                          ) : (
                            <>
                              Send request

                              <span
                                className="
                                  transition-transform
                                  duration-300
                                  group-hover:translate-x-1
                                  group-hover:-translate-y-1
                                "
                              >
                                ↗
                              </span>
                            </>
                          )}
                        </button>

                        <p className="mt-4 text-center text-xs text-black/35">
                          Fields marked with * are required.
                        </p>

                      </form>

                    </motion.div>

                  ) : (

                    /* ================= SUCCESS ================= */

                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="
                        flex
                        min-h-[70vh]
                        flex-col
                        justify-center
                      "
                    >

                      <div
                        className="
                          flex
                          h-14
                          w-14
                          items-center
                          justify-center
                          rounded-full
                          bg-black
                          text-xl
                          text-white
                        "
                      >
                        ✓
                      </div>

                      <h2
                        className="
                          mt-8
                          max-w-xl
                          font-space
                          text-4xl
                          font-medium
                          leading-[0.95]
                          tracking-[-0.05em]
                          md:text-6xl
                        "
                      >
                        Thanks for
                        <br />
                        reaching out.
                      </h2>

                      <p
                        className="
                          mt-6
                          max-w-md
                          text-base
                          leading-relaxed
                          text-black/50
                          md:text-lg
                        "
                      >
                        I&apos;ve received your project details.
                        I&apos;ll review everything and get back to
                        you shortly.
                      </p>

                      <button
                        onClick={handleClose}
                        className="
                          group
                          mt-10
                          flex
                          w-fit
                          items-center
                          gap-3
                          rounded-xl
                          bg-black
                          px-6
                          py-4
                          text-sm
                          font-medium
                          text-white
                          transition-all
                          duration-300
                          hover:bg-black/80
                        "
                      >
                        Back to portfolio

                        <span
                          className="
                            transition-transform
                            duration-300
                            group-hover:translate-x-1
                          "
                        >
                          ↗
                        </span>
                      </button>

                    </motion.div>

                  )}

                </AnimatePresence>

                <div className="h-16 md:h-24" />

              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    );
  }

  export default ProjectForm;