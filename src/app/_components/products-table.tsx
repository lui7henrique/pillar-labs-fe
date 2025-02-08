"use client";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useGetAllProducts } from "@/generated/default";
import { formatCurrency } from "@/lib/utils";
import { ProductDialog } from "./product-dialog";
import { Button } from "@/components/ui/button";

export function ProductsTable() {
	const { data: products, isLoading } = useGetAllProducts();

	const renderContent = () => {
		if (isLoading || !products) {
			return (
				<>
					{Array.from({ length: 20 }, () => {
						return (
							<TableRow key={Math.random()}>
								<TableCell className="font-medium">
									<Skeleton className="w-[20ch] h-4" />
								</TableCell>

								<TableCell className="text-muted-foreground">
									<Skeleton className="w-[50ch] h-[2ex]" />
								</TableCell>

								<TableCell>
									<Skeleton className="w-[66px] h-[22px] ml-auto" />
								</TableCell>

								<TableCell>
									<Skeleton className="w-[33px] h-[22px] ml-auto" />
								</TableCell>
							</TableRow>
						);
					})}
				</>
			);
		}

		if (products.length === 0) {
			return <div>Nenhum produto encontrado</div>;
		}

		return (
			<>
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

						<TableCell className="text-right">
							<ProductDialog product={product}>
								<Button size="sm" className="">
									Edit
								</Button>
							</ProductDialog>
						</TableCell>
					</TableRow>
				))}
			</>
		);
	};

	return (
		<Table>
			<TableHeader>
				<TableRow className="bg-muted">
					<TableHead>Name</TableHead>
					<TableHead>Description</TableHead>
					<TableHead className="text-right">Price</TableHead>
					<TableHead className="text-right">Stock</TableHead>
					<TableHead />
				</TableRow>
			</TableHeader>

			<TableBody>{renderContent()}</TableBody>
		</Table>
	);
}
