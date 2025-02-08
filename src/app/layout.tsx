import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
	variable: "--font-figtree",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Pillar Labs • Products",
	description: "Pillar Labs • Products",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${figtree.variable} antialiased`}>
				<main className="bg-foreground p-8 h-screen">
					<div className="h-full">{children}</div>
				</main>
			</body>
		</html>
	);
}
