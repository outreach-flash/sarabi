export function SpacesIntro() {
  return (
    <section
      id="realms"
      className="page-wrap py-[55px] sm:grid sm:min-h-[300px] sm:grid-cols-2 sm:items-center sm:gap-[40px] sm:py-[70px] wide:min-h-[420px] wide:grid-cols-[1fr_0.7fr] wide:gap-[100px] wide:py-[90px]"
    >
      <h2
        className="type-page-title text-[33px] leading-[1.12] sm:text-[38px] wide:text-[clamp(38px,4vw,56px)]"
        data-reveal
      >
        Find your place in <em className="em-accent">the experience.</em>
      </h2>
      <p className="type-page-body mt-[18px] max-w-[520px] sm:mt-0" data-reveal>
        A night at Sarabi moves through three realms. It begins on the Sundeck as the sun drops into the sea,
        gathers around the Pond as live sets ripple across the water, and ends in the Den, where the dance floor
        takes over until the early hours. Where will you be when it happens?
      </p>
    </section>
  )
}
