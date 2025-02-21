import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      className={`flex justify-between min-h-screen flex-col items-center p-12 ${inter.className} dark:bg-black bg-blue-200/50 dark:text-black text-black`}
    >
      {children}
    </main>
  );
};

export default Layout;
