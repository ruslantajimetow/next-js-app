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
import Image from 'next/image';

export default function UserButton({ user }: Session) {
  if (user) {
    return (
      <div>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger>
            {user.image && <Image src={user.image} alt={user.name!} />}
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
              <Sun />
              <Moon />
              <span>Theme: theme</span>
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
