"use client";

import { Button } from "@/components/ui/button";
import { ProductsTable } from "./_components/products-table";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Home() {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<div className="flex flex-col justify-center items-center h-full max-w-5xl mx-auto py-16 space-y-4">
				<header className="flex justify-between items-center w-full">
					<h1 className="text-2xl font-bold">Products</h1>
					<Button>Add Product</Button>
				</header>

				<div className="overflow-auto rounded-lg border border-border bg-background">
					<ProductsTable />
				</div>
			</div>
		</QueryClientProvider>
	);
}
