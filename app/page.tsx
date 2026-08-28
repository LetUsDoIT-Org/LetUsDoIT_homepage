import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import Lane from "@/components/Lane";
import ProcessModel from "@/components/ProcessModel";
import ProcessPath from "@/components/ProcessPath";

const SYMPTOMS = [
  {
    title: "Den samme oplysning tastes ind to eller tre gange",
    body: "Ordren kommer på mail, tastes i økonomisystemet og skrives igen i et regneark. Ingen af stederne ved, hvad de andre gør.",
  },
  {
    title: "Processen findes kun i hovedet på én person",
    body: "Når hun holder ferie, går det langsomt. Når hun siger op, starter I forfra.",
  },
  {
    title: "I ved, at AI kan noget — men ikke hvad hos jer",
    body: "Der er ingen mangel på demoer. Der er meget få, der kører i drift hos en dansk virksomhed på jeres størrelse.",
  },
];

const METHOD = [
  {
    title: "Kortlæg",
    body: "Jeg tegner processen, som den faktisk foregår. Ikke som den står i en vejledning.",
  },
  {
    title: "Vurder",
    body: "Hvad kan automatiseres, hvad kan AI løse, og hvad skal blive ved med at være en menneskelig beslutning.",
  },
  {
    title: "Byg",
    body: "Jeg bygger det. Integration til jeres nuværende systemer, automatisering og AI, hvor det giver mening.",
  },
  {
    title: "Overdrag",
    body: "I skal kunne drive det uden mig. Dokumentation og oplæring følger med.",
  },
];

const LEAD_SERVICES = [
  {
    title: "AI-rådgivning",
    body: "Hvor betaler AI sig i jeres forretning, og hvor gør den ikke? I får et konkret svar på jeres egne processer — ikke en gennemgang af, hvad teknologien kan i almindelighed.",
  },
  {
    title: "AI-implementering",
    body: "Fra beslutning til noget, der rent faktisk kører. Integration i de systemer og arbejdsgange, I har i forvejen, så løsningen holder efter at jeg er gået hjem.",
  },
];

const FOUNDATION_SERVICES = [
  {
    title: "Procesautomatisering",
    body: "Manuelle trin fjernes, så de ikke skal laves igen i morgen.",
  },
  {
    title: "Procesanalyse og lean",
    body: "Systematisk gennemgang af, hvor tiden faktisk går.",
  },
  {
    title: "Procesmodellering",
    body: "Arbejdsgangene tegnet, så hele huset kan se det samme billede.",
  },
];

const ALSO = [
  "Chatbots og selvbetjening",
  "App-udvikling, også MVP og PoC",
  "Microsoft 365-opsætning",
  "Drupal og Strapi",
  "Agil projektledelse (SCRUM-certificeret)",
];

export default function Home() {
  return (
    <>
      <ProcessPath />

      {/* The pool floats on the modelling canvas. The padding here is what
          lets the canvas and its grid actually show, rather than being
          covered edge to edge by full-bleed section fills. */}
      {/* No top padding or top border here: the sticky bar above supplies the
          pool's top edge, so the two meet as one continuous frame. */}
      <div className="px-3 pb-3 lg:px-10 lg:pb-10">
      <div className="mx-auto max-w-[1300px] border border-t-0 border-rule shadow-[0_1px_16px_rgba(0,46,69,0.06)]">

      <main id="top">
        {/* Hero: the model is the argument, so it opens the page. */}
        <section className="bg-pool">
          <div className="mx-auto grid max-w-[1280px] grid-cols-[36px_1fr] md:grid-cols-[64px_1fr]">
            <div className="flex items-start justify-center border-r border-rule pt-14 text-ink-mute">
              <span className="lane-name">Procesmodel</span>
            </div>

            <div className="min-w-0 px-5 py-14 md:px-12 md:py-20">
              <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-14">
                <div>
                  <h1 className="display display-hero font-bold leading-[1.02] text-ink">
                    AI virker ikke på en proces, som ingen har tegnet.
                  </h1>
                  <p className="mt-7 max-w-measure text-lg leading-relaxed text-ink-soft">
                    Jeg tegner processen, og jeg bygger løsningen. Kortlægningen
                    er ikke leverancen — den er grunden til, at det, jeg bygger,
                    stadig kører, når jeg er gået hjem.
                  </p>

                  <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                    {/* Same words as the action in the header: one action,
                        one name, all the way through. */}
                    <a
                      href="#kontakt"
                      className="bg-act px-7 py-3.5 font-semibold text-ink shadow-[0_2px_10px_rgba(0,46,69,0.2)] transition-transform duration-300 ease-settle hover:-translate-y-px"
                    >
                      Book en gennemgang
                    </a>
                    <a
                      href="#metoden"
                      className="font-semibold text-flow-ink underline decoration-flow/50 hover:decoration-flow-ink"
                    >
                      Se hvordan jeg arbejder
                    </a>
                  </div>
                </div>

                <ProcessModel />
              </div>
            </div>
          </div>
        </section>

        <Lane id="problemet" name="Problemet">
          <h2 className="display max-w-[19ch] text-3xl font-bold leading-[1.08] text-ink md:text-[2.6rem]">
            Det manuelle arbejde står sjældent i et system
          </h2>
          <p className="mt-6 max-w-measure text-lg leading-relaxed text-ink-soft">
            Det ligger i mails, regneark og vaner. Derfor kan man hverken sætte
            en robot eller en sprogmodel til det, før nogen har tegnet det op.
          </p>

          <dl className="mt-12 border-t border-rule">
            {SYMPTOMS.map((symptom) => (
              <div
                key={symptom.title}
                className="grid gap-2 border-b border-rule py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] md:gap-10"
              >
                <dt className="text-lg font-semibold leading-snug text-ink">
                  {symptom.title}
                </dt>
                <dd className="max-w-measure leading-relaxed text-ink-soft">
                  {symptom.body}
                </dd>
              </div>
            ))}
          </dl>
        </Lane>

        {/* Ink lane. The method genuinely is a sequence, so it is numbered. */}
        <Lane id="metoden" name="Metoden" tone="ink">
          <h2 className="display max-w-[18ch] text-3xl font-bold leading-[1.08] text-canvas md:text-[2.6rem]">
            Fire trin, og I ejer resultatet
          </h2>
          <p className="mt-6 max-w-measure text-lg leading-relaxed text-canvas/75">
            Rækkefølgen er ikke til forhandling. Springer man kortlægningen
            over, bygger man automatik oven på et gæt.
          </p>

          <ol className="mt-12 grid gap-px bg-white/15 md:grid-cols-2 xl:grid-cols-4">
            {METHOD.map((step, index) => (
              <li key={step.title} className="bg-ink p-6 pt-5">
                {/* Ordinal only. Bright blue on the navy field read as the
                    cyan-on-dark AI tell, and a step number is not flow. */}
                <span
                  aria-hidden
                  className="measure-num block text-sm font-bold text-canvas/65"
                >
                  {index + 1}
                </span>
                <h3 className="mt-3 text-xl font-semibold text-canvas">
                  {step.title}
                </h3>
                <p className="mt-2.5 leading-relaxed text-canvas/75">{step.body}</p>
              </li>
            ))}
          </ol>
        </Lane>

        <Lane id="ydelser" name="Ydelser">
          <h2 className="display max-w-[16ch] text-3xl font-bold leading-[1.08] text-ink md:text-[2.6rem]">
            Rådgivning og implementering
          </h2>

          <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-14">
            {LEAD_SERVICES.map((service) => (
              // Ink, not green: green is reserved for a step a machine has
              // taken over, and a service heading is not that.
              <div key={service.title} className="border-t-2 border-ink pt-5">
                <h3 className="text-2xl font-semibold text-ink">{service.title}</h3>
                <p className="mt-3 max-w-measure text-lg leading-relaxed text-ink-soft">
                  {service.body}
                </p>
              </div>
            ))}
          </div>

          <h3 className="mt-16 text-lg font-semibold text-ink">
            Fundamentet under det
          </h3>
          <dl className="mt-5 border-t border-rule">
            {FOUNDATION_SERVICES.map((service) => (
              <div
                key={service.title}
                className="grid gap-1.5 border-b border-rule py-5 md:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] md:gap-10"
              >
                <dt className="font-semibold text-ink">{service.title}</dt>
                <dd className="max-w-measure leading-relaxed text-ink-soft">
                  {service.body}
                </dd>
              </div>
            ))}
          </dl>

          <h3 className="mt-14 text-lg font-semibold text-ink">
            Jeg laver også
          </h3>
          <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2.5">
            {ALSO.map((item) => (
              <li
                key={item}
                className="border border-rule px-3 py-1.5 text-sm text-ink-soft"
              >
                {item}
              </li>
            ))}
          </ul>
        </Lane>

        <Lane id="hvem" name="Hvem" tone="ink">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-16">
            <div>
              <h2 className="display text-3xl font-bold leading-[1.08] text-canvas md:text-[2.6rem]">
                Jeg hedder Simon Christiansen
              </h2>
              <div className="mt-6 max-w-measure space-y-5 text-lg leading-relaxed text-canvas/80">
                <p>
                  Jeg har mange års erfaring fra <strong className="font-semibold text-canvas">IBM</strong>, hvor
                  jeg arbejdede med forretningsprocesser og IT-implementering i
                  stor skala — for kunder, hvor tingene skulle virke i drift,
                  ikke bare i en præsentation. LetUsDoIT er mit eget selskab.
                </p>
                <p>
                  Det betyder, at det er mig, der kommer ud, mig der tegner,
                  mig der bygger det, og mig I taler med hele vejen. Ingen
                  konsulent nummer to, der overtager sagen efter salgsmødet, og
                  ingen aflevering af en rapport, I selv skal finde ud af at
                  føre ud i livet.
                </p>
                <p>
                  Jeg er SCRUM-certificeret og arbejder agilt, fordi
                  procesarbejde sjældent kan planlægges færdigt på forhånd.
                </p>
              </div>
            </div>

            <div className="max-w-[260px] self-start border border-white/20 bg-white p-5">
              <Image
                src="/images/logo/LetUsDoIT-logo-light.jpeg"
                alt="LetUsDoIT ApS"
                width={260}
                height={200}
                className="h-auto w-full"
              />
            </div>
          </div>
        </Lane>

        <Lane id="kontakt" name="Kontakt">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
            <div>
              <h2 className="display max-w-[17ch] text-3xl font-bold leading-[1.08] text-ink md:text-[2.6rem]">
                Lad os tage én proces ad gangen
              </h2>
              <p className="mt-6 max-w-measure text-lg leading-relaxed text-ink-soft">
                Skriv hvilken arbejdsgang der driller. Så vender jeg tilbage med,
                hvad jeg ville kigge på først — også hvis svaret er, at AI ikke
                er det, I har brug for.
              </p>

              <dl className="mt-10 space-y-5 border-t border-rule pt-8">
                <div>
                  <dt className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-mute">
                    E-mail
                  </dt>
                  <dd className="mt-1 text-lg">
                    <a
                      href="mailto:simon@letusdoit.dk"
                      className="font-medium text-flow-ink underline decoration-flow/50 hover:decoration-flow-ink"
                    >
                      simon@letusdoit.dk
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-mute">
                    Telefon
                  </dt>
                  <dd className="measure-num mt-1 text-lg">
                    <a
                      href="tel:+4541208088"
                      className="font-medium text-flow-ink underline decoration-flow/50 hover:decoration-flow-ink"
                    >
                      +45 41 20 80 88
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <ContactForm />
          </div>
        </Lane>
      </main>

      {/* The pool closes with its own title block. */}
      <footer className="border-t border-rule bg-ink text-canvas">
        <div className="mx-auto grid max-w-[1280px] grid-cols-[36px_1fr] md:grid-cols-[64px_1fr]">
          <div className="border-r border-white/20" />
          <div className="flex flex-wrap items-end justify-between gap-6 px-5 py-10 md:px-12">
            <div>
              <p className="display text-lg font-semibold">LetUsDoIT ApS</p>
              <p className="measure-num mt-1 text-sm text-canvas/70">
                CVR 45625818
              </p>
            </div>
            <p className="measure-num text-sm text-canvas/70">
              © {new Date().getFullYear()} LetUsDoIT ApS
            </p>
          </div>
        </div>
      </footer>

      </div>
      </div>
    </>
  );
}
