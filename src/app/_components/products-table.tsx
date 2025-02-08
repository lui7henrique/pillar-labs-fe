"use client";

import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useGetAllProducts } from "@/generated/default";
import { formatCurrency } from "@/lib/utils";

export function ProductsTable() {
	const { data: products } = useGetAllProducts();

	if (!products) {
		return <div>Carregando produtos...</div>;
	}

	return (
		<Table className="">
			<TableHeader>
				<TableRow className="bg-muted">
					<TableHead>Name</TableHead>
					<TableHead>Description</TableHead>
					<TableHead className="text-right">Price</TableHead>
					<TableHead className="text-right">Stock</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{products.map((product) => (
					<TableRow key={product._id}>
						<TableCell className="font-medium">{product.name}</TableCell>
						<TableCell className="text-muted-foreground">
							{product.description}
						</TableCell>

						<TableCell className="text-right">
							<Badge variant="outline">
								{formatCurrency(product.price ?? 0)}
							</Badge>
						</TableCell>
						<TableCell className="text-right">
							<Badge variant="outline">{product.stock}</Badge>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
