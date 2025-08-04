// src/pages/HomePage.tsx

function HomePage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8"> {/* Centered container */}
      {/* Hero Section */}
      <section className="text-center mb-16"> {/* mb-16 = margin-bottom: 4rem */}
        <img
          src="/images/hero-background.jpg"
          alt="Abstract 3D render"
          className="w-full h-auto rounded-lg mb-8 shadow-lg" // Added a shadow
        />
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white"> {/* Responsive text size */}
            Stunning Visuals, Unforgettable Stories
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            We are a creative studio specializing in high-quality 3D and 2D digital art for film, games, and advertising.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-8 text-white">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8"> {/* Responsive grid */}
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-yellow-400">3D Modeling</h3>
            <p className="text-gray-400">Creating detailed models for games, films, and products.</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-yellow-400">2D Animation</h3>
            <p className="text-gray-400">Bringing stories to life with classic and digital animation.</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-yellow-400">Visual Effects</h3>
            <p className="text-gray-400">Integrating stunning effects into live-action footage.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;