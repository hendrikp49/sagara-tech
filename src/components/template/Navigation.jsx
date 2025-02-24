import Link from "next/link";
import { useRouter } from "next/router";

const Navigation = () => {
  const router = useRouter();

  return (
    <nav className="py-4 border-b gap-10 border-white flex items-center justify-center">
      <Link
        href={"/"}
        className={`hover:underline-offset-8 hover:underline ${
          router.pathname === "/" && "underline-offset-8 underline"
        }`}
      >
        Home
      </Link>
      <Link
        href={"/characterByLocation"}
        className={`hover:underline-offset-8 hover:underline ${
          router.pathname === "/characterByLocation" &&
          "underline-offset-8 underline"
        }`}
      >
        Char By Location
      </Link>
    </nav>
  );
};

export default Navigation;
