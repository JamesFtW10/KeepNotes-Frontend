function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-10 text-center">
      <h1 className="mb-4 text-3xl font-bold sm:text-4xl">404 - Page Not Found</h1>
      <p className="text-base text-gray-600 sm:text-lg">The page you are looking for does not exist.</p>

       <a href="/" className="mt-4 font-semibold text-blue-500 underline">Go back to the homepage.</a> 
    </div>
  );
}

export default NotFoundPage; 