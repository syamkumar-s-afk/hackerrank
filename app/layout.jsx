import { ThemeProvider } from "../context/ThemeContext";
import "./output.css"; // Output from tailwind CLI

export const metadata = {
    title: 'HackerRank Environment Clone',
    description: 'A 1:1 UI clone of the HackerRank coding environment',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
