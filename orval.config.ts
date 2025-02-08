module.exports = {
	"plotwist-api": {
		input: {
			target: "http://localhost:3333/api-docs-json",
		},
		output: {
			mode: "tags",
			target: "src/generated/endpoints.ts",
			client: "react-query",
			override: {
				mutator: {
					path: "./src/services/axios-instance.ts",
					name: "axiosInstance",
				},
				query: {
					useQuery: true,
					useInfinite: false,
					useSuspenseQuery: true,
					useSuspenseInfiniteQuery: false,
				},
			},
		},
	},
};
