import { UserPlus, Scissors, Palette, LineChart } from 'lucide-react';

export const howItWorks = [
    {
        title: 'Personalized Consultation',
        description: 'Share your style preferences and nail care history for tailored designs',
        icon: <UserPlus className="w-8 h-8 text-primary" />,
    },
    {
        title: 'Create Your Nail Art',
        description: 'Design beautiful and unique nail art with the help of our expert technicians',
        icon: <Scissors className="w-8 h-8 text-primary" />,
    },
    {
        title: 'Choose Your Colors',
        description: 'Select from a wide range of premium nail colors and finishes for your perfect look',
        icon: <Palette className="w-8 h-8 text-primary" />,
    },
    {
        title: 'Track Nail Health & Progress',
        description: 'Monitor your nail care progress with personalized recommendations and treatments',
        icon: <LineChart className="w-8 h-8 text-primary" />,
    },
];