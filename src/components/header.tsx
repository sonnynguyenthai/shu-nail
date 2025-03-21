import React from 'react';
import { Button } from './ui/button';
import {
    AlignJustify,
    ShoppingCart,
} from 'lucide-react';
import Link from 'next/link';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Input } from './ui/input';
import { SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose, Sheet } from './ui/sheet';
import AdminSheet from '@/app/(management)/admin/_components/admin.sheet';
export default async function Header() {
    return (
        <header className="fixed top-0 w-full border-b bg-background backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background">
            <nav className="container mx-auto px-4 h-20 flex items-center justify-between">
                <Link href="/">
                    <Image
                        src={'/logoHeader.jpg'}
                        alt="Shu nails Logo"
                        width={500}
                        height={200}
                        className="h-12 py-1 w-auto object-contain"
                    />
                </Link>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 md:space-x-4">
                    <SignedIn>
                        {/* <Link href="/dashboard">
                            <Button
                                variant="outline"
                                className="hidden md:inline-flex items-center gap-2"
                            >
                                <LayoutDashboard className="h-4 w-4" />
                                Industry Insights
                            </Button>
                            <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                                <LayoutDashboard className="h-4 w-4" />
                            </Button>
                        </Link> */}

                        {/* Growth Tools Dropdown */}
                        {/* <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="flex items-center gap-2 gradient-background">
                                    <StarsIcon className="h-4 w-4" />
                                    <span className="hidden md:block">Growth Tools</span>
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem asChild>
                                    <Link href="/resume" className="flex items-center gap-2">
                                        <FileText className="h-4 w-4" />
                                        Build Resume
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/ai-cover-letter"
                                        className="flex items-center gap-2"
                                    >
                                        <PenBox className="h-4 w-4" />
                                        Cover Letter
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/interview" className="flex items-center gap-2">
                                        <GraduationCap className="h-4 w-4" />
                                        Interview Prep
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu> */}
                    </SignedIn>

                    <SignedIn>
                        <ShoppingCart className='w-6 h-6 cursor-pointer hover:w-8 h-8' />
                        {/* <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: 'w-10 h-10',
                                    userButtonPopoverCard: 'shadow-xl',
                                    userPreviewMainIdentifier: 'font-semibold',
                                },
                            }}
                            afterSignOutUrl="/"
                        /> */}
                        <AdminSheet />
                    </SignedIn>

                    <SignedOut>
                        <SignInButton>
                            <Button variant="outline">Sign In</Button>
                        </SignInButton>
                    </SignedOut>
                </div>
            </nav>
        </header>
    );
}