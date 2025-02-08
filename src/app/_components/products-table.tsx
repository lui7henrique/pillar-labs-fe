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
								<TableCell>
									<Skeleton className="w-[10ch] h-[22px] ml-auto" />
								</TableCell>
								<TableCell>
									<Skeleton className="w-[82px] h-[22px] ml-auto" />
								</TableCell>
								<TableCell>
									<Skeleton className="w-[35px] h-[22px]" />
								</TableCell>
								<TableCell>
									<Skeleton className="w-[47px] h-[31px] ml-auto" />
								</TableCell>
							</TableRow>
						);
					})}
				</>
			);
		}

		if (products.length === 0) {
			return (
				<TableRow>
					<TableCell
						colSpan={5}
						className="text-center text-muted-foreground h-48"
					>
						No products found
					</TableCell>
				</TableRow>
			);
		}

		return (
			<>
				{products.map((product) => (
					<TableRow key={product._id}>
						<TableCell className="font-medium whitespace-nowrap">
							{product.name}
						</TableCell>
						<TableCell>
							<Badge variant="outline">
								{formatCurrency(product.price ?? 0)}
							</Badge>
						</TableCell>
						<TableCell className="font-medium">
							<Badge>{product.category}</Badge>
						</TableCell>
						<TableCell>
							<Badge variant="outline">{product.quantity}</Badge>
						</TableCell>

						<TableCell className="text-right">
							<ProductDialog product={product}>
								<Button size="sm" variant="outline">
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
					<TableHead className="w-[20ch]">Name</TableHead>
					<TableHead className="w-[10ch]">Price</TableHead>
					<TableHead className="w-[15ch]">Category</TableHead>
					<TableHead className="w-[10ch]">Quantity</TableHead>
					<TableHead />
				</TableRow>
			</TableHeader>

			<TableBody>{renderContent()}</TableBody>
		</Table>
	);
}
