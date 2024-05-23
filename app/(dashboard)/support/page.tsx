'use client';
import ChangePasswordForm from '@/components/forms/change-password-form';
import ProfileForm from '@/components/forms/profile-form';
import SupportForm from '@/components/forms/support-form';
import { ShieldAlert, User } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { ReactNode } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function Support() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const currentTab = searchParams.get('tab');

  const tabs: {
    title: string;
    id: number;
    icon: ReactNode;
    component?: ReactNode;
  }[] = [
    {
      title: 'Edit Profile',
      id: 0,
      icon: <User size={14} />,
      component: <ProfileForm />,
    },
    {
      title: 'Change Password',
      id: 1,
      icon: <ShieldAlert size={14} />,
      component: <ChangePasswordForm />,
    },
  ];

  const handleSwitch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('tab', term);
    } else {
      params.delete('tab');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 200);
  return (
    <div className="px-4 py-2 space-y-4 h-[90vh]">
      <h1 className="text-default font-semibold text-sm">Support</h1>
      <div className="w-[100%] flex justify-center">
        <SupportForm />
      </div>
    </div>
  );
}
