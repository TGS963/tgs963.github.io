import { Inter } from "next/font/google";
import { Card } from "@/components/card";
import Stars from "@/components/star";
import Image from "next/image";
import Socials from "@/components/socials";
import { Projects } from "@/components/projects";
import Layout from "./layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout>
      <main
        className={`flex justify-between min-h-screen flex-col items-center p-12 ${inter.className} dark:bg-black bg-green-200/50 dark:text-green-200 text-green-500`}
      >
        <Stars />
        {/* Main Content Start */}
        <main className="flex flex-col gap-4">
          <section className="grid grid-cols-1 md:grid-cols-5 gap-4 w-full">
            <Card customClassName="md:col-span-3">
              <div className="flex items-center justify-center space-x-4 h-full">
                <Image
                  src="/profile.jpg"
                  alt="Suvojit Ghosh"
                  width={96}
                  height={96}
                  className="rounded-full object-cover"
                  priority
                />
                <section className="flex flex-col justify-between h-full py-6">
                  <p className="font-semibold text-3xl frutiger-metallic-text">
                    Suvojit Ghosh
                  </p>
                  <p className="text-sm frutiger-metallic-text">
                    I am a software engineer passionate about building scalable
                    systems and exploring new technologies. Currently focused on
                    full-stack development, DevOps, and low level assembly.
                    Always learning and contributing to open source.
                  </p>
                </section>
              </div>
            </Card>
            <Card customClassName="md:col-span-2">
              <Socials />
            </Card>
          </section>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <Card enableGlow customClassName="">
              <p className="text-2xl md:text-start text-center font-medium frutiger-metallic-text">
                Projects
              </p>
              <Projects />
            </Card>
            <section className="flex flex-col gap-4">
              <Card customClassName="">
                <p className="text-2xl md:text-start text-center font-medium frutiger-metallic-text pb-2">
                  GitHub Contribution Chart
                </p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://ghchart.rshah.org/26a85c/TGS963"
                  alt="Your GitHub Contributions Chart"
                  className="w-full object-cover rounded-lg"
                />
              </Card>
              <Card customClassName="">
                <p className="text-2xl md:text-start text-center font-medium frutiger-metallic-text pb-2">
                  Work Experiences
                </p>
                <p className="text-sm frutiger-metallic-text pb-6">
                  I&apos;ve worked with a variety of companies and startups.
                  Here are some of my most notable experiences:
                </p>
                <section className="2xl:flex-row flex-col flex gap-4 2xl:pb-2">
                  <a
                    href="https://boostbot.ai"
                    className="p-4 bg-gradient-to-r from-green-300/30 via-green-100 to-green-300/30 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
                  >
                    <img
                      src="/boostbot.png"
                      alt="Boostbot.ai"
                      className="w-16 h-16 rounded-full object-cover mb-2"
                    />
                    <p className="text-lg frutiger-metallic-text font-semibold">
                      Software Engineer at Boostbot.ai
                    </p>
                    <p className="text-sm frutiger-metallic-text">
                      I built an email client, deployed cloud infrastructure,
                      and created reactive UIs.
                    </p>
                  </a>
                  <a
                    href="https://outlandishdigital.us/home"
                    className="p-4 bg-gradient-to-r from-green-300/30 via-green-100 to-green-300/30 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
                  >
                    <img
                      src="/outlandish.png"
                      alt="Outlandish Digital"
                      className="w-16 h-16 rounded-full object-cover mb-2"
                    />
                    <p className="text-lg frutiger-metallic-text font-semibold">
                      Software Engineer at Outlandish Digital
                    </p>
                    <p className="text-sm frutiger-metallic-text">
                      I led development of data pipelines and APIs, driving
                      performance gains and scalability.
                    </p>
                  </a>
                </section>
              </Card>
            </section>
          </section>
        </main>
        {/* Main Content End */}
        {/* Footer Start */}
        <span className="pt-12 z-20">TGS963</span>
        {/* Footer End */}
      </main>
    </Layout>
  );
}
