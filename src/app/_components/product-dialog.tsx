import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGetAllCategories } from "@/generated/default";
import type { Product } from "@/generated/endpoints.schemas";
import { useOptimisticProduct } from "@/hooks/products";
import { getAllFakerDepartments } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, type PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const productSchema = z.object({
	name: z.string().min(1, "Name is required"),
	price: z.number().min(0, "Price must be positive"),
	category: z.string(),
	quantity: z.number().int().min(0, "Quantity must be positive"),
	description: z.string().min(1, "Description is required"),
});

type ProductFormData = z.infer<typeof productSchema>;
type ProductFormProps = PropsWithChildren<{
	product?: Product;
}>;

export function ProductDialog({ children, product }: ProductFormProps) {
	const [open, setOpen] = useState(false);
	const { createProduct, updateProduct } = useOptimisticProduct();
	const { data: categories } = useGetAllCategories();

	const form = useForm<ProductFormData>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			name: product?.name ?? "",
			price: product?.price ?? 0,
			category: product?.category ?? "Other",
			quantity: product?.quantity ?? 0,
			description: product?.description ?? "",
		},
	});

	const handleReset = () => {
		form.reset();
		setOpen(false);
	};

	const onSubmit = async (data: ProductFormData) => {
		if (product?._id) {
			await updateProduct({
				id: product._id,
				data: data,
			});

			return handleReset();
		}

		await createProduct({ data });
		handleReset();
	};

	useEffect(() => {
		if (product) {
			form.reset(product);
		}
	}, [product, form.reset]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>{product ? "Edit product" : "Add product"}</DialogTitle>
					<DialogDescription>
						{product
							? "Edit the product details."
							: "Add a new product to the database."}
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Price</FormLabel>
									<FormControl>
										<Input
											type="number"
											step="0.01"
											{...field}
											onChange={(e) => field.onChange(Number(e.target.value))}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="category"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<SelectTrigger>
												<SelectValue placeholder="Select a category" />
											</SelectTrigger>

											<SelectContent>
												{categories?.map((category) => {
													if (!category?.name || !category?._id) return;

													return (
														<SelectItem
															key={category._id}
															value={category.name}
														>
															{category.name}
														</SelectItem>
													);
												})}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="quantity"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Quantity</FormLabel>
									<FormControl>
										<Input
											type="number"
											{...field}
											onChange={(e) => field.onChange(Number(e.target.value))}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button type="submit" disabled={form.formState.isSubmitting}>
								{form.formState.isSubmitting ? "Submitting..." : "Submit"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
