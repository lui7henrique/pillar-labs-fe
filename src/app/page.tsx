"use client";

import { Button } from "@/components/ui/button";
import { ProductsTable } from "./_components/products-table";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Image from "next/image";
import { ProductDialog } from "./_components/product-dialog";

export default function Home() {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<div className="flex flex-col justify-center items-center h-full max-w-5xl mx-auto p-6 space-y-4 bg-background border rounded-md">
				<header className="flex justify-between items-center w-full">
					<Image src="/logo.png" alt="Pillar Labs" width={160} height={41} />

					<ProductDialog>
						<Button>Add Product</Button>
					</ProductDialog>
				</header>

				<div className="overflow-auto rounded-md border border-border bg-background w-full">
					<ProductsTable />
				</div>
			</div>
		</QueryClientProvider>
	);
}
