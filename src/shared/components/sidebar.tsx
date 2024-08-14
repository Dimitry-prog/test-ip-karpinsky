import { NAV_LINKS } from '@/shared/lib/constants.ts';
import { cn } from '@/shared/lib/utils.ts';
import { Link, useLocation } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/components/ui/tooltip.tsx';
import { Button } from '@/shared/components/ui/button.tsx';
import { ChevronLeftIcon } from 'lucide-react';
import { useState } from 'react';

const Sidebar = () => {
  const { pathname } = useLocation();
  const [collapse, setCollapse] = useState(true);

  return (
    <aside
      className={cn(
        'flex min-w-60 flex-col gap-10 transition-all duration-500',
        collapse && 'min-w-10'
      )}
    >
      <div className={cn('flex items-center justify-between gap-4', collapse && 'justify-center')}>
        {!collapse && (
          <Link to="/" className="pl-4 uppercase">
            Logo
          </Link>
        )}

        <Button onClick={() => setCollapse(!collapse)} variant="ghost" size="sm">
          <ChevronLeftIcon className={cn('size-4', collapse && 'rotate-180')} />
        </Button>
      </div>
      <nav className="w-full">
        <ul>
          {NAV_LINKS.map((link) => (
            <li
              key={link.path}
              className={cn(
                'rounded-sm text-lg transition-all duration-300 hover:bg-gray-200',
                pathname === link.path && 'bg-gray-100'
              )}
            >
              <Tooltip>
                <TooltipTrigger className={cn('hidden', collapse && 'block')}>
                  <Link to={link.path} className="flex items-center gap-2 px-4 py-2">
                    <link.icon className="size-6" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>{link.label}</TooltipContent>
              </Tooltip>

              <Link
                to={link.path}
                className={cn('flex items-center gap-2 px-4 py-2', collapse && 'hidden')}
              >
                <link.icon className="size-6" />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
