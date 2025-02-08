# Product Management System

A modern web application for managing products built with Next.js and TypeScript.

## ⚡ Tools Used

- **Framework**: Next.js 14 with App Router
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **Form Handling**: React Hook Form + Zod
- **HTTP Client**: Axios
- **API Client Generation**: Orval
- **AI Assistance**: Cursor with Claude 3.5 Sonnet

## ⏱️ Development Time

This project was developed in approximately 2 hours (front-end), including:

- Initial setup
- UI component implementation
- API integration
- Form validation
- Optimistic updates
- Error handling

## 🚀 Getting Started

> ⚠️ **Important**: This application requires the backend server to be running first. Make sure to set up and run the backend following the instructions at [pillar-labs-be](https://github.com/lui7henrique/pillar-labs-be) before proceeding.

### Setup

1. Clone the repository:

```bash
git clone https://github.com/lui7henrique/pillar-labs-fe
cd pillar-labs-fe
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
# .env.local

NEXT_PUBLIC_API_URL=http://localhost:3333
```

4. Run the development server:

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 What's Next

- [ ] Add product deletion
- [ ] Implement search and filtering
- [ ] Add pagination
- [ ] Implement sorting by columns
- [ ] Add unit and integration tests
- [ ] Add bulk operations (import/export)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
