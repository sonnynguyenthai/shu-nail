'use client';
import React, { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import { X } from 'lucide-react';
import { Button } from './ui/button';

const MenuWithBadge = ({ title = "menu title" }: { title: string }) => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleMenuItemClick = (item: string) => {
        setSelectedItems([...selectedItems, item]);
    };

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <label className="text-sm font-medium">{title}</label>

                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleMenuItemClick('Profile')}>Profile</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleMenuItemClick('Billing')}>Billing</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleMenuItemClick('Team')}>Team</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleMenuItemClick('Subscription')}>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <div className='flex flex-wrap space-x-2 space-y-2' >
                {selectedItems.map((item, index) => (
                    <Badge variant="outline" className='cursor-pointer' key={index}>{item}
                        <X className='hover:cursor-pointer' />
                    </Badge>
                ))}
            </div>
        </div>
    );
};

export default MenuWithBadge;