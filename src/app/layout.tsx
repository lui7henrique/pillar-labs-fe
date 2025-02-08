import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Pattern } from "@/components/ui/pattern";

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
			<body className={`${figtree.variable} antialiased bg-foreground`}>
				<main className="lg:p-8 h-screen relative">
					<div className="h-full">{children}</div>
				</main>

				<Pattern variant="checkered" />

				<Toaster />
			</body>
		</html>
	);
}
