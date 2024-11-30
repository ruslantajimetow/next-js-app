'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, Moon, Settings, Sun, TruckIcon } from 'lucide-react';

import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Switch } from '../ui/switch';

export default function UserButton({ user }: Session) {
  const { setTheme, theme } = useTheme();
  const [checked, setChecked] = useState<boolean>(false);

  const changeThemeHandler = () => {
    switch (theme) {
      case 'dark':
        return setChecked(true);
      case 'light':
        return setChecked(false);
      case 'system':
        return setChecked(false);
    }
  };

  useEffect(() => {
    changeThemeHandler();
  }, []);

  const onChangeSwithcHandler = (checked: boolean) => {
    setChecked((prev) => !prev);
    if (checked) setTheme('dark');
    if (!checked) setTheme('light');
  };

  console.log(theme);
  if (user) {
    return (
      <div>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger>
            {user.image && (
              <Image src={user.image} alt={user.name!} fill={true} />
            )}
            {!user.image && (
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/25">
                <span>{user.name?.charAt(0).toUpperCase()}</span>
              </div>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60 p-3">
            <DropdownMenuLabel className="bg-primary/30 p-2 flex flex-col items-center justify-center gap-1 rounded-lg font-normal mb-2">
              {user.image && <Image src={user.image} alt={user.name!} />}
              {!user.image && (
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary">
                  <span>{user.name?.charAt(0).toUpperCase()}</span>
                </div>
              )}
              <p className="font-semibold">{user.name}</p>
              <span className="font-medium text-xs">{user.email}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="group flex items-center cursor-pointer transition-all duration-200">
              <TruckIcon className="group-hover:translate-x-1 transition-all duration-400" />
              <span>My orders</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="group flex items-center cursor-pointer transition-all duration-200">
              <Settings className="group-hover:rotate-180 transition-all duration-400" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="group flex items-center cursor-pointer">
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex gap-2 items-center"
              >
                {theme === 'dark' ? (
                  <Moon className="text-blue-600" />
                ) : (
                  <Sun className="text-yellow-400" />
                )}
                {theme && (
                  <span>
                    {theme?.charAt(0).toUpperCase() + theme?.slice(1)}
                  </span>
                )}

                <Switch
                  className="scale-75"
                  checked={checked}
                  onCheckedChange={onChangeSwithcHandler}
                />
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="mt-3 group flex items-center cursor-pointer focus:bg-destructive/20 transition-all duration-200"
              onClick={() => signOut()}
            >
              <LogOut className="group-hover:scale-75 transition-all duration-350" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
}
