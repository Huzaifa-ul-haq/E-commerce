import { FaShippingFast, FaLock, FaUndo, FaHeadset } from "react-icons/fa";

const services = [
  {
    icon: <FaShippingFast className="text-4xl text-cyan-100" />,
    title: "Free Shipping",
    description: "Enjoy free shipping on all orders above $50 with fast delivery.",
  },
  {
    icon: <FaLock className="text-4xl text-cyan-100" />,
    title: "Secure Payments",
    description: "We provide 100% secure payment gateways for worry-free shopping.",
  },
  {
    icon: <FaUndo className="text-4xl text-cyan-100" />,
    title: "Easy Returns",
    description: "Hassle-free 7-day return policy for all eligible products.",
  },
  {
    icon: <FaHeadset className="text-4xl text-cyan-100" />,
    title: "24/7 Support",
    description: "Our support team is available 24/7 to assist you anytime.",
  },
];

const Services = () => {
  return (
    <section className="py-16 px-4 !bg-gray-100 dark:!bg-gray-200 transition-colors duration-700">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-cyan-600 mb-12 pt-20">
          Our Services
        </h2>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-cyan-300 dark:bg-cyan-700 shadow-md dark:shadow-lg rounded-xl p-6 cursor-pointer hover:scale-105 transform transition duration-300"
              data-aos="fade-up"              
              data-aos-delay={index * 150}    
            >
              <div className="mb-4 flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {service.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-200 text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
