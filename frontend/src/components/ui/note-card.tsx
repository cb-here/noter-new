import { Calendar } from "lucide-react";
import { GlowingEffect } from "./glowing-effect";
import { cn } from "@/lib/utils";

interface NoteCardProps {
  title: string;
  content: string;
  date?: string;
  onClick?: () => void;
  className?: string;
}

export const NoteCard = ({
  title,
  content,
  date,
  onClick,
  className,
}: NoteCardProps) => {
  return (
    <div
      className={cn("min-h-56 cursor-pointer", className)}
      onClick={onClick}
    >
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-gray-700 p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-3xl border-[0.75px] bg-[#0a0a0a] p-4! shadow-sm md:p-6!">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-5.5 font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-7.5 text-balance text-white mb-2!">
                {title}
              </h3>
              <p className="font-sans text-sm leading-4.5 md:text-base md:leading-5.5 text-gray-400 line-clamp-4">
                {content}
              </p>
            </div>
                {date && (
                <p className="text-xs text-gray-500 mt-2 inline-flex gap-1">
                  <Calendar className="w-4 h-4 " />
                  {date}
                  </p>
              )}
              
          </div>
        </div>
      </div>
    </div>
  );
};
