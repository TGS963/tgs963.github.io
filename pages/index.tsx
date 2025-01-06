import { Inter } from "next/font/google";
import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";
import { Card } from "@/components/card";
import Stars from "@/components/star";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className} dark:bg-black bg-green-50 dark:text-green-200 text-green-500`}>
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
            <FiSun className="w-5 h-5 text-yellow-500" />
          ) : (
            <FiMoon className="w-5 h-5 text-gray-700" />
          )}
        </button>
      </section>
      {/* Top Nav End */}
      {/* Main Content Start */}
      <Card customClassName="w-1/2">

      </Card>
      TGS963 Portfolio Website
    </main>
  );
}