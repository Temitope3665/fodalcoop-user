'use client';
import * as React from 'react';
import Link from 'next/link';
import { dashboardConfig } from '@/config/dashboard';
import { Icon } from '@/components/Icon';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { SidebarNavItem } from '@/types';

export default function SidebarNav() {
  return (
    <div className="flex h-full max-h-screen flex-col gap-5 fixed w-[18%]">
      <div className="flex-1">
        <nav className="items-start px-2 text-sm font-medium lg:px-4 space-y-2">
          {dashboardConfig.sidebarNav.map((item, idx) => (
            <React.Fragment key={idx}>
              <MenuItem item={item} />
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
}

const MenuItem = ({ item }: { item: SidebarNavItem }) => {
  const pathname = usePathname();
  const { href, icon, title } = item;
  const isActive = href && pathname.startsWith(href);
  return (
    <Link
      className={cn(
        'py-4 font-light trans text-sm px-4 rounded-lg text-default bg-white flex items-center space-x-2',
        isActive && 'bg-primary text-white'
      )}
      href={href}
    >
      <div>{icon}</div>
      <p>{title}</p>
    </Link>
  );
};

// const MenuItem = ({ item }: { item: SidebarNavItem }) => {
//   const pathname = usePathname();
//   const [subMenuOpen, setSubMenuOpen] = React.useState(false);

//   const toggleSubMenu = () => {
//     setSubMenuOpen(!subMenuOpen);
//   };

//   const isActive = item.href && pathname.startsWith(item.href);

//   return (
//     <>
//       {item.submenu ? (
//         <>
//           <button
//             onClick={toggleSubMenu}
//             className={cn(
//               'flex items-center justify-between gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
//               isActive ? 'bg-muted text-primary' : 'bg-primary text-muted-foreground'
//             )}
//           >
//             <div className="flex items-center gap-3">
//               <Icon className="h-4 w-4" name={item.icon} /> {item.title}
//             </div>
//             <div className={`${subMenuOpen ? 'rotate-180' : ''} flex`}>
//               <Icon className="w-6 h-6" name="ChevronDown" />
//             </div>
//           </button>

//           {subMenuOpen && (
//             <div className="my-2 ml-12 flex flex-col space-y-4">
//               {item.subMenuItems?.map((subItem, idx) => {
//                 return (
//                   <Link
//                     key={idx}
//                     href={subItem.href}
//                     className={cn(
//                       'flex items-center gap-3 rounded-lg transition-all hover:text-primary',
//                       subItem.href === pathname
//                         ? 'text-primary'
//                         : 'text-muted-foreground'
//                     )}
//                   >
//                     <span>{subItem.title}</span>
//                   </Link>
//                 );
//               })}
//             </div>
//           )}
//         </>
//       ) : (
//         <Link
//           className={cn(
//             'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
//             isActive ? 'bg-muted text-primary' : 'text-muted-foreground'
//           )}
//           href={item.href}
//         >
//           <Icon className="h-4 w-4" name={item.icon} /> {item.title}
//         </Link>
//       )}
//     </>
//   );
// };
// function Package2Icon(props: any) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
//       <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
//       <path d="M12 3v6" />
//     </svg>
//   );
// }
