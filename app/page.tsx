import Link from 'next/link';
import { MountainIcon } from 'lucide-react';
import UserAuthForm from '@/components/user-auth-form';

export default function Login() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2">
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-balance text-muted-foreground">
              Sign in to your account
            </p>
          </div>
          <UserAuthForm />
        </div>
      </div>
      <div className="relative h-full flex-col hidden bg-muted p-10 lg:flex lg:h-full">
        <div className="absolute inset-0 bg-muted" />
        <header className="relative z-10 flex h-20 w-full shrink-0 items-center justify-end px-4 md:px-6">
          <Link className="flex items-center gap-2" href="#">
            <MountainIcon className="h-6 w-6" />
            <span className="font-semibold">Fodal Coop</span>
          </Link>
        </header>

        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than ever
              before.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
