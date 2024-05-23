'use client';
import ChangePasswordForm from '@/components/forms/change-password-form';
import ProfileForm from '@/components/forms/profile-form';
import { cn } from '@/lib/utils';
import { ShieldAlert, User } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { ReactNode } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function Settings() {
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
    <div className="px-4 py-2 space-y-4">
      <h1 className="text-default font-semibold text-sm">Settings</h1>
      <div className="grid grid-cols-4 bg-white rounded-lg border border-light p-4 ">
        <div className="col-span-1 w-[100%] space-y-2 border-r">
          {tabs.map((tab) => (
            <div
              className={cn(
                'flex space-x-2 font-light rounded-lg w-[90%] border items-center px-3 py-3 text-sm ',
                Number(currentTab) === tab.id &&
                  'bg-primary border-primary text-white'
              )}
              key={tab.title}
              onClick={() => handleSwitch(tab.id)}
            >
              {tab.icon}
              <p role="button">{tab.title}</p>
            </div>
          ))}
        </div>
        <div className="col-span-3 px-28 h-[86vh] overflow-y-auto">
          {tabs[Number(currentTab)].component}
        </div>
      </div>
    </div>
  );
}
