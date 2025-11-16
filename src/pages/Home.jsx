import PrimaryButton from '../components/PrimaryButton'

export default function Home() {

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      <div className="order-2 md:order-1">
        <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
          Connect with <span style={{ color: 'var(--scarlet-color)' }}>Rutgers</span> peers across campus
        </h1>
        <p className="text-neutral-700 dark:text-neutral-300 mb-6 max-w-prose">
          Scarlet Connect is a simple demo to showcase the Rutgers-exclusive messaging and connecting app.
        </p>
        <div className="flex gap-3">
          <PrimaryButton to="/map">Open Campus Map</PrimaryButton>
          <a
            className="inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition"
            href="#features"
          >
            Learn more
          </a>
        </div>
      </div>

      <div className="order-1 md:order-2">
        <div className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-soft">
          <div className="h-40 sc-gradient" />
          <div className="p-6">
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              Rutgers color system applied via Tailwind and custom CSS variables. Navigation, CTA, and map page are
              included.
            </p>
          </div>
        </div>
      </div>

      <div id="features" className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
        {[
          { t: 'Rutgers Theme', d: 'Scarlet red, black, and white across components.' },
          { t: 'Map View', d: 'Leaflet map with demo people markers on campus.' },
          { t: 'Simple Routing', d: 'Home and Map pages using React Router.' },
        ].map((f) => (
          <div key={f.t} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-soft">
            <h3 className="font-semibold mb-1 text-neutral-900 dark:text-neutral-100">{f.t}</h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">{f.d}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
