import { Inter } from "next/font/google";
import { useTheme } from "next-themes";
import { FiSun, FiMoon, FiGithub, FiTwitter } from "react-icons/fi";
import { Card } from "@/components/card";
import Stars from "@/components/star";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <main className={`flex justify-between min-h-screen flex-col items-center p-24 ${inter.className} dark:bg-black bg-green-50 dark:text-green-200 text-green-500`}>
      <Stars />
      {/* Top Nav Start */}
      <section className="fixed top-0 w-full p-2 flex justify-end">
        <button
          type="button"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-lg bg-green-200 dark:bg-gray-800 hover:bg-green-300 dark:hover:bg-gray-700 transition-colors duration-200"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <FiSun className="w-5 h-5 text-green-500" />
          ) : (
            <FiMoon className="w-5 h-5 text-gray-700" />
          )}
        </button>
      </section>
      {/* Top Nav End */}
      {/* Main Content Start */}
      <main className="flex flex-col gap-4">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <Card enableGlow>
            <div className="flex items-center justify-center space-x-4">
              <Image
                src="/profile.jpg"
                alt="Suvojit Ghosh"
                width={96}
                height={96}
                className="rounded-full object-cover"
                priority
              />
              <section className="flex-col justify-between">
                <p className="font-semibold text-2xl frutiger-metallic-text">Suvojit Ghosh</p>
                <p className="text-lg frutiger-metallic-text">Software Engineer</p>
              </section>
            </div>
          </Card>
          <Card>
            <p className="pb-2 font-medium frutiger-metallic-text">Socials</p>
            <div className="flex gap-4">
            <a href="https://github.com/TGS963" 
              className="flex items-center gap-2 hover:text-green-600 transition-colors duration-200">
              <FiGithub className="w-5 h-5" />
              GitHub
            </a>
            <a href="https://x.com/@TheGodSlayer963" 
              className="flex items-center gap-2 hover:text-green-600 transition-colors duration-200">
              <FiTwitter className="w-5 h-5" />
              Twitter
            </a>
            </div>
          </Card>
        </section>
      <Card enableGlow>
        <p className="text-lg frutiger-metallic-text pb-2">Experience</p>
      </Card>
      <Card customClassName="w-fit">
        <p className="text-lg frutiger-metallic-text pb-2">GitHub Contribution Chart</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://ghchart.rshah.org/26a85c/TGS963" alt="Your GitHub Contributions Chart" />
      </Card>
      </main>
      {/* Main Content End */}
      {/* Footer Start */}
      TGS963
      {/* Footer End */}
    </main>
  );
}