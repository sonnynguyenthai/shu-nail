'use client';
import React, { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import { MapPinPlus, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

const MenuWithBadge = ({
    title = "menu title",
    selectedItems,
    setSelectedItems,
    items = []
}: {
    title: string;
    selectedItems: string[];
    setSelectedItems: (items: string[]) => void;
    items?: string[];
}) => {

    const handleMenuItemClick = (item: string) => {
        if (!selectedItems.includes(item)) {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const handleRemove = (itemToRemove: string) => {
        setSelectedItems(selectedItems.filter(item => item !== itemToRemove));
    };

    return (
        <div>
            <div className='flex items-center mb-1 space-x-2'>
                <label className="text-sm font-medium">{title}</label>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <MapPinPlus className='w-5 h-5 hover:cursor-pointer hover:scale-110 transition-transform' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Select an option</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {items.map((item, index) => (
                            <DropdownMenuItem
                                key={index}
                                onClick={() => handleMenuItemClick(item)}
                                className={selectedItems.includes(item) ? "opacity-50 pointer-events-none" : ""}
                            >
                                {item}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <Card className='p-2 rounded-lg'>
                <div className='flex flex-wrap gap-2'>
                    {selectedItems.map((item) => (
                        <Badge key={item} variant="outline" className='flex py-0 items-center space-x-1'>
                            {item}
                            <Button
                                size="icon"
                                variant="ghost"
                                className="w-4 h-4 p-0"
                                onClick={() => handleRemove(item)}
                            >
                                <X className="w-3 h-3" />
                            </Button>
                        </Badge>

                    ))}
                </div>
            </Card>
        </div>
    );
};

export default MenuWithBadge;
