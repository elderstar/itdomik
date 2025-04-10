import SignupForm from "@/components/auth/SignupForm";

export default function LandingPage() {
    return (
        // <h1>Hello Register</h1>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Create your account</h2>
            <div className="container mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <SignupForm />
            </div>
        </div>

    );
  } 