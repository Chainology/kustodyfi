'use client'

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">
          Get in Touch
        </h2>
        <a 
          href="mailto:contact@kustodyfi.com"
          className="text-blue-400 hover:text-blue-300 text-xl"
        >
          contact@kustodyfi.com
        </a>
      </div>
    </section>
  )
}

