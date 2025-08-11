import { cn } from '@/application/shared/lib/utils';
import { cva } from 'class-variance-authority';
import { motion } from 'framer-motion';

const pulsatingDotsVariants = cva(
  'h-2 w-2 rounded-full bg-primary',
  {
    variants: {
      variant: {
        default: 'bg-primary-foreground',
        destructive: 'bg-white',
        outline: 'hover:bg-accent-foreground',
        secondary: 'bg-secondary-foreground',
        ghost: 'hover:bg-accent-foreground',
        link: 'bg-primary',
      },
    },
  }
)

type Props = {
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined
}

export default function PulsatingDots({ className, variant = 'default' }: Props) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex space-x-2">
        <motion.div
          className={cn(pulsatingDotsVariants({ className, variant }))}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        />
        <motion.div
          className={cn(pulsatingDotsVariants({ className, variant }))}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            ease: 'easeInOut',
            repeat: Infinity,
            delay: 0.3,
          }}
        />
        <motion.div
          className={cn(pulsatingDotsVariants({ className, variant }))}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            ease: 'easeInOut',
            repeat: Infinity,
            delay: 0.6,
          }}
        />
      </div>
    </div>
  );
}
