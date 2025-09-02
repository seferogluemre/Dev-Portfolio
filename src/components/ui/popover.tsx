import * as React from "react"
import { cn } from "@/lib/utils"

interface PopoverProps {
  children: React.ReactNode;
}

interface PopoverTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
  align?: "center" | "start" | "end";
}

const PopoverContext = React.createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
}>({
  open: false,
  setOpen: () => {}
});

const Popover = ({ children }: PopoverProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <PopoverContext.Provider value={{ open, setOpen }}>
      <div className="relative">
        {children}
      </div>
    </PopoverContext.Provider>
  );
};

const PopoverTrigger = ({ children, asChild = false }: PopoverTriggerProps) => {
  const { open, setOpen } = React.useContext(PopoverContext);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: () => setOpen(!open),
      ...children.props
    });
  }

  return (
    <button onClick={() => setOpen(!open)}>
      {children}
    </button>
  );
};

const PopoverContent = ({ children, className, align = "center" }: PopoverContentProps) => {
  const { open, setOpen } = React.useContext(PopoverContext);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, setOpen]);

  if (!open) return null;

  const alignmentClasses = {
    center: "left-1/2 transform -translate-x-1/2",
    start: "left-0",
    end: "right-0"
  };

  return (
    <div
      ref={contentRef}
      className={cn(
        "absolute top-full mt-2 z-50 rounded-md border bg-background p-4 shadow-md animate-in fade-in-0 zoom-in-95",
        alignmentClasses[align],
        className
      )}
    >
      {children}
    </div>
  );
};

export { Popover, PopoverTrigger, PopoverContent }