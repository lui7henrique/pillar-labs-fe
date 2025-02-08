import {
	getGetAllProductsQueryKey,
	useUpdateProduct,
} from "@/generated/default";
import { useCreateProduct } from "@/generated/default";
import type { Product } from "@/generated/endpoints.schemas";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useOptimisticProduct() {
	const queryClient = useQueryClient();

	const { mutateAsync: createProduct } = useCreateProduct({
		mutation: {
			onSuccess: (product) => {
				queryClient.setQueryData(
					getGetAllProductsQueryKey(),
					(old: Product[]) => [...old, product],
				);

				toast.success("Product created successfully");
			},
			onError: () => {
				toast.error("Failed to create product");
			},
		},
	});

	const { mutateAsync: updateProduct } = useUpdateProduct({
		mutation: {
			onSuccess: (product) => {
				queryClient.setQueryData(
					getGetAllProductsQueryKey(),
					(old: Product[]) =>
						old.map((p) => (p._id === product._id ? product : p)),
				);

				toast.success("Product updated successfully");
			},
			onError: () => {
				toast.error("Failed to update product");
			},
		},
	});

	return { createProduct, updateProduct };
}
