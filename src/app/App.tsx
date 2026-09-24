export default function App() {
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-[#f7f2ec] px-6 py-10"
      style={{ fontFamily: "'Lato', system-ui, sans-serif" }}
    >
      <div className="w-full max-w-3xl rounded-[28px] border border-[#d7c6b2] bg-[#fffdfb] p-8 shadow-[0_20px_60px_rgba(61,48,40,0.08)] md:p-12">
        <p className="mb-6 text-center text-[10px] font-medium tracking-[0.35em] text-[#b98a43] uppercase">
          Jacqueline Ruddy
        </p>

        <div className="mb-8 text-center">
          <span className="inline-block rounded-full border border-[#d7c6b2] bg-[#f4efe9] px-4 py-2 text-[10px] font-medium tracking-[0.2em] text-[#3d3028] uppercase">
            Coming Soon
          </span>
        </div>

        <h1
          className="text-center text-4xl font-normal leading-tight text-[#3d3028] md:text-6xl"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          The website is on its way.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-center text-base leading-relaxed text-[#5f514a] md:text-lg">
          We are preparing a new online experience for our ceremonies, stories, and enquiries.
          Please check back soon for the full launch.
        </p>

        <div className="mt-10 border-t border-[#e9dfd3] pt-8 text-center text-sm text-[#5f514a]">
          <p className="mb-2 tracking-[0.14em] text-[#b98a43] uppercase">Independent Celebrant</p>
          <p>Aberdeenshire, Scotland</p>
          <p className="mt-3">hello@jacquelineruddy.co.uk</p>
        </div>
      </div>
    </main>
  );
}
