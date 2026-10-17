
import "./globals.css";

export const metadata = {
  title: "QuestLog | The System",
  description: "A Solo Leveling-inspired notes application.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
