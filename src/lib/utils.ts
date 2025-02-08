import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { faker } from "@faker-js/faker";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(value);
}

export function getAllFakerDepartments(count = 10): string[] {
	const departments = new Set<string>();

	while (departments.size < count) {
		departments.add(faker.commerce.department());
	}

	return Array.from(departments).sort();
}
