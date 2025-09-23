import Link from "next/link";

export const Footer = () => {
  return (
    <footer className=" border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
        <Link
          href="https://waze.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Dados fornecidos pelo Waze App. Saiba mais em Waze.com
        </Link>
      </div>
    </footer>
  );
};
