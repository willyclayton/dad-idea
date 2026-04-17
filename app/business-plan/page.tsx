import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Plan — FilterDrop",
  description: "FilterDrop business plan: AC filter subscription and HVAC data intelligence platform.",
};

export default function BusinessPlanPage() {
  const filePath = path.join(process.cwd(), "BUSINESS_PLAN.md");
  const content = fs.readFileSync(filePath, "utf-8");

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-5 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-brand-700">FilterDrop</Link>
          <Link
            href="/register"
            className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-5 py-12 md:py-16">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 mt-0">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 pb-2 border-b border-gray-100">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">{children}</h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-base font-semibold text-gray-700 mt-6 mb-2">{children}</h4>
            ),
            p: ({ children }) => (
              <p className="text-gray-600 leading-relaxed mb-4 text-[15px]">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-outside ml-5 mb-4 space-y-1.5 text-gray-600 text-[15px]">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-outside ml-5 mb-4 space-y-1.5 text-gray-600 text-[15px]">{children}</ol>
            ),
            li: ({ children }) => <li className="leading-relaxed">{children}</li>,
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-brand-400 pl-4 my-6 text-gray-500 italic">{children}</blockquote>
            ),
            code: ({ children, className }) => {
              const isBlock = className?.includes("language-");
              return isBlock ? (
                <code className="block bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm font-mono text-gray-800 overflow-x-auto mb-4 whitespace-pre">
                  {children}
                </code>
              ) : (
                <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-[13px] font-mono">{children}</code>
              );
            },
            pre: ({ children }) => <div className="mb-4">{children}</div>,
            table: ({ children }) => (
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse">{children}</table>
              </div>
            ),
            thead: ({ children }) => <thead className="bg-gray-50">{children}</thead>,
            th: ({ children }) => (
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3 border border-gray-200">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-4 py-3 text-gray-700 border border-gray-200 text-[14px]">{children}</td>
            ),
            tr: ({ children }) => <tr className="even:bg-gray-50/50">{children}</tr>,
            hr: () => <hr className="border-gray-200 my-10" />,
            a: ({ href, children }) => (
              <a href={href} className="text-brand-600 hover:text-brand-700 underline underline-offset-2">
                {children}
              </a>
            ),
            strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      {/* Footer */}
      <footer className="py-10 bg-gray-900 text-gray-400 mt-8">
        <div className="max-w-4xl mx-auto px-5 flex flex-col items-center gap-5 md:flex-row md:justify-between">
          <Link href="/" className="text-white font-bold text-lg">FilterDrop</Link>
          <p className="text-xs">© {new Date().getFullYear()} FilterDrop. All rights reserved.</p>
          <div className="flex gap-6 text-xs">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="mailto:hello@filterdrop.com" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
