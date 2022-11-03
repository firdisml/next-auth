import "tailwindcss/tailwind.css";
import { Navigation } from "../components/navigation";
import type { AppProps } from "next/app";
import { UserProvider } from "../context/user.context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider initialUser={pageProps?.user}>
      <div className="h-screen">
        <Navigation />
        <Component {...pageProps} />
      </div>
    </UserProvider>
  );
}
