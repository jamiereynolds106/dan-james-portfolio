"use client";

import { useState, useRef } from "react";

/* ─── Video Data ─── */
const videos: {
  id: number;
  src: string;
  poster: string;
  label: string;
  category: string;
}[] = [
  // Add videos here:
  // { id: 1, src: "/images/video-1.mp4", poster: "/images/poster-1.jpg", label: "Video Title", category: "ugc" },
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("all");
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const [playingId, setPlayingId] = useState<number | null>(null);

  const toggleVideo = (id: number) => {
    const video = videoRefs.current[id];
    if (!video) return;

    if (playingId === id) {
      video.pause();
      setPlayingId(null);
    } else {
      if (playingId !== null && videoRefs.current[playingId]) {
        videoRefs.current[playingId]!.pause();
      }
      video.play();
      setPlayingId(id);
    }
  };

  const filteredVideos =
    activeFilter === "all"
      ? videos
      : videos.filter((v) => v.category === activeFilter);

  return (
    <>
      {/* ═══════════ NAVIGATION ═══════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/90 backdrop-blur-xl border-b border-brass/20">
        <div className="max-w-[1400px] mx-auto px-6 py-5 flex items-center justify-between">
          <a
            href="#"
            className="text-sm font-semibold tracking-[0.08em] text-cream"
          >
            Dan James
          </a>
          <div className="flex items-center gap-8">
            {["Work", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[0.72rem] font-medium tracking-[0.18em] uppercase text-cream/60 hover:text-cream transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main>
        {/* ═══════════ HERO ═══════════ */}
        <section className="min-h-screen flex items-center relative overflow-hidden bg-navy">
          <div className="max-w-[1400px] mx-auto px-6 pt-24 pb-16 md:py-32 grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
            <div className="order-2 md:order-1">
              <p className="font-script text-coral-soft text-3xl md:text-4xl mb-4">
                your story, authentically told
              </p>
              <h1
                className="font-bold text-cream leading-[1.05] mb-6 tracking-[-0.02em]"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
              >
                DAN JAMES
              </h1>
              <p className="text-cream/50 text-lg md:text-xl max-w-[480px] leading-relaxed mb-8 font-light">
                Content creator and storyteller bringing authentic perspectives to every project.
              </p>
              <a
                href="#work"
                className="inline-block bg-coral hover:brightness-110 text-white font-semibold text-[0.72rem] tracking-[0.18em] uppercase px-8 py-4 rounded-full transition-all duration-300"
              >
                See My Work
              </a>
            </div>

            <div className="relative order-1 md:order-2">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-brass/30 bg-navy-deep flex items-center justify-center">
                {/* Replace with headshot: */}
                {/* <Image src="/images/headshot.jpg" alt="Dan James" fill className="object-cover" style={{ objectPosition: "center top" }} priority /> */}
                <span className="text-cream/20 text-sm tracking-wide uppercase">Headshot</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ DIVIDER ═══════════ */}
        <div className="h-1 bg-coral-soft" />

        {/* ═══════════ PORTFOLIO / VIDEO GRID ═══════════ */}
        <section id="work" className="bg-navy py-20 md:py-28">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
              <div>
                <p className="font-script text-coral-soft text-2xl md:text-3xl mb-2">
                  portfolio
                </p>
                <h2 className="text-3xl md:text-5xl font-bold text-cream leading-tight tracking-[-0.02em]">
                  Featured Work
                </h2>
              </div>

              <div className="flex gap-3 mt-6 md:mt-0">
                {["all", "ugc"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`text-[0.72rem] tracking-[0.14em] uppercase font-semibold px-5 py-2.5 rounded-full transition-all duration-200 ${
                      activeFilter === filter
                        ? "bg-coral text-white"
                        : "bg-cream/10 text-cream/60 hover:bg-coral hover:text-white"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {filteredVideos.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredVideos.map((video) => (
                  <div
                    key={video.id}
                    className="video-card rounded-xl overflow-hidden"
                    onClick={() => video.src && toggleVideo(video.id)}
                  >
                    <video
                      ref={(el) => {
                        videoRefs.current[video.id] = el;
                      }}
                      className="w-full aspect-[9/16] object-cover rounded-xl"
                      playsInline
                      loop
                      controls
                      preload="metadata"
                      poster={video.poster}
                    >
                      <source src={video.src} type="video/mp4" />
                    </video>

                    <div className="play-btn">
                      <div className="play-icon w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <svg
                          width="14"
                          height="16"
                          viewBox="0 0 14 16"
                          fill="none"
                        >
                          <path d="M14 8L0 16V0L14 8Z" fill="white" />
                        </svg>
                      </div>
                    </div>

                    <div className="video-label">
                      <p className="text-cream text-base md:text-lg font-semibold">
                        {video.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-cream/40">
                <p className="text-lg">Videos coming soon</p>
              </div>
            )}
          </div>
        </section>

        {/* ═══════════ DIVIDER ═══════════ */}
        <div className="h-1 bg-coral-soft" />

        {/* ═══════════ ABOUT ═══════════ */}
        <section id="about" className="py-20 md:py-28 bg-navy">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="max-w-[700px]">
              <p className="font-script text-coral-soft text-2xl md:text-3xl mb-4">
                the creator
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-cream mb-8 leading-tight tracking-[-0.02em]">
                About Dan
              </h2>
              <div className="space-y-5 text-cream/50 leading-relaxed text-lg font-light mb-10">
                <p>
                  Bio coming soon.
                </p>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-cream/40">
                {[
                  "Authentic",
                  "Creative",
                  "Professional",
                ].map((trait, i, arr) => (
                  <span key={trait} className="flex items-center gap-4">
                    {trait}
                    {i < arr.length - 1 && (
                      <span className="text-brass/40">—</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ CONTACT ═══════════ */}
        <section id="contact" className="bg-cream py-20 md:py-28">
          <div className="max-w-[600px] mx-auto px-6 text-center">
            <p className="font-script text-coral-soft text-3xl mb-4">
              let&apos;s work together
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-navy mb-6 leading-tight tracking-[-0.02em]">
              Ready to Create Something?
            </h2>
            <p className="text-text-muted text-lg leading-relaxed mb-10 font-light">
              Get in touch to discuss your next project.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-14">
              <a
                href="mailto:dan@example.com"
                className="inline-block bg-coral hover:brightness-110 text-white font-semibold text-[0.72rem] tracking-[0.18em] uppercase px-8 py-4 rounded-full transition-all"
              >
                Get in Touch
              </a>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-navy/20 text-navy hover:border-navy font-semibold text-[0.72rem] tracking-[0.18em] uppercase px-8 py-4 rounded-full transition-colors"
              >
                Instagram
              </a>
            </div>

            <div className="flex flex-col items-center gap-4">
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-coral transition-colors"
              >
                <span className="block text-sm font-medium text-navy">Instagram</span>
                <span className="text-sm">@handle</span>
              </a>
              <a
                href="mailto:dan@example.com"
                className="text-text-muted hover:text-coral transition-colors"
              >
                <span className="block text-sm font-medium text-navy">Email</span>
                <span className="text-sm">dan@example.com</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="bg-navy border-t border-brass/20 py-8">
        <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center text-cream/40 text-sm">
          <span>&copy; 2026 Dan James</span>
          <span className="font-semibold text-cream tracking-[0.08em]">DJ</span>
        </div>
      </footer>
    </>
  );
}
