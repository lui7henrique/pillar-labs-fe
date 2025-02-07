import { Button } from "@/components/ui/button";
import { ProductsTable } from "./_components/products-table";

export default function Home() {
	return (
		<div className="flex flex-col justify-center items-center h-full max-w-4xl mx-auto">
			<header className="flex justify-between items-center w-full">
				<h1 className="text-2xl font-bold">Products</h1>
				<Button>Add Product</Button>
			</header>

			<ProductsTable />
		</div>
	);
}
