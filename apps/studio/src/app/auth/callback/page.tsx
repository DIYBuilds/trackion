import { onAuthenticateUser } from '@/actions/user';
import { Info, Loader } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function AuthCallback({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // TODO! limit the redirect_to to the app domain
  const redirectTo = (await searchParams).redirect_to;
  const auth = await onAuthenticateUser();

  if (auth.status === 200 || auth.status === 201) {
    if (redirectTo) {
      return redirect(redirectTo as string);
    } else {
      return redirect('/app');
    }
  }

  if (auth.status === 403 || auth.status === 400 || auth.status === 500) {
    return <ErrorState />;
  }

  return <LoadingState />;
}

const LoadingState = () => (
  <div className="mt-20 w-full flex justify-center">
    <div className="flex flex-col items-center gap-2">
      <Loader className="w-10 h-10 animate-spin text-primary" />
      <h3 className="text-xl font-bold">Redirecting...</h3>
      <p>Please wait...</p>
    </div>
  </div>
);

const ErrorState = () => (
  <div className="mt-20 w-full flex justify-center">
    <div className="flex flex-col items-center gap-2">
      <Info className="w-10 h-10 text-red-500 text-primary" />
      <h3 className="text-xl font-bold">Problem is onboarding</h3>
      <p>Please refresh the page.</p>
    </div>
  </div>
);
