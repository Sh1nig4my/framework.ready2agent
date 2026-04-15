import type { SVGProps } from "react";
import { cn } from "@/components/ui/cn";

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

function IconBase({ className, size = 20, ...props }: IconProps) {
  return (
    <svg
      className={cn("shrink-0", className)}
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      width={size}
      {...props}
    />
  );
}

export function DashboardIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 5h7v7H4z" />
      <path d="M13 5h7v4h-7z" />
      <path d="M13 11h7v8h-7z" />
      <path d="M4 14h7v5H4z" />
    </IconBase>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
      <circle cx="9.5" cy="7" r="3" />
      <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 4.13a4 4 0 0 1 0 7.75" />
    </IconBase>
  );
}

export function OperatorsIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="9" cy="7" r="3" />
      <path d="M3 21v-1a4 4 0 0 1 4-4h4" />
      <path d="M15 11l2 2 4-4" />
      <path d="M13 21h8" />
      <path d="M17 17v8" />
    </IconBase>
  );
}

export function AdministratorsIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3 5 6v5c0 4.4 2.9 8.4 7 9 4.1-.6 7-4.6 7-9V6Z" />
      <circle cx="12" cy="10" r="2.5" />
      <path d="M9.5 16a3 3 0 0 1 5 0" />
    </IconBase>
  );
}

export function BookIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5V4.5A2.5 2.5 0 0 1 6.5 2Z" />
    </IconBase>
  );
}

export function WebinarIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 12a8 8 0 0 1 16 0" />
      <path d="M8 12a4 4 0 0 1 8 0" />
      <circle cx="12" cy="12" r="1" />
      <path d="M6 18h12" />
    </IconBase>
  );
}

export function GamepadIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M7 10h10a4 4 0 0 1 4 4l-1 4a2 2 0 0 1-2 1.5h-2a2 2 0 0 1-1.8-1.1l-.6-1.2a2 2 0 0 0-1.8-1.2h-.6a2 2 0 0 0-1.8 1.2l-.6 1.2A2 2 0 0 1 7 19.5H5a2 2 0 0 1-2-1.5l-1-4a4 4 0 0 1 4-4Z" />
      <path d="M7 13v2" />
      <path d="M6 14h2" />
      <path d="M16 14h.01" />
      <path d="M18 12h.01" />
    </IconBase>
  );
}

export function TrophyIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 4h10v4a5 5 0 0 1-10 0Z" />
      <path d="M7 5H5a2 2 0 0 0 0 4h2" />
      <path d="M17 5h2a2 2 0 0 1 0 4h-2" />
    </IconBase>
  );
}

export function SettingsIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.54V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1-1.54 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.54-1H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.54-1 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9a1.7 1.7 0 0 0 1-1.54V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.54 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V9c.24.61.83 1 1.49 1H21a2 2 0 1 1 0 4h-.09c-.66 0-1.25.39-1.51 1Z" />
    </IconBase>
  );
}

export function LogoutIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </IconBase>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </IconBase>
  );
}

export function EyeIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </IconBase>
  );
}

export function PencilIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 20h9" />
      <path d="m16.5 3.5 4 4L7 21H3v-4z" />
    </IconBase>
  );
}

export function TrashIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="m6 6 1 14h10l1-14" />
    </IconBase>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </IconBase>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m5 12 4 4L19 6" />
    </IconBase>
  );
}

export function XIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </IconBase>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 5h16v14H4z" />
      <path d="m4 7 8 6 8-6" />
    </IconBase>
  );
}

export function DollarIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 2v20" />
      <path d="M17 6.5A4 4 0 0 0 12 4a4 4 0 0 0 0 8 4 4 0 0 1 0 8 4 4 0 0 1-5-2.5" />
    </IconBase>
  );
}

export function ActivityIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M3 12h4l3-8 4 16 3-8h4" />
    </IconBase>
  );
}

export function TrendIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m3 17 6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </IconBase>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M7 2v4" />
      <path d="M17 2v4" />
      <path d="M3 8h18" />
      <rect x="3" y="4" width="18" height="17" rx="2" />
    </IconBase>
  );
}

export function MessageIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
    </IconBase>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </IconBase>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m10 8 6 4-6 4z" />
    </IconBase>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m12 3 2.8 5.7L21 9.6l-4.5 4.3L17.7 21 12 18l-5.7 3 1.2-7.1L3 9.6l6.2-.9Z" />
    </IconBase>
  );
}

export function AwardIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="8" r="5" />
      <path d="m8 13-2 8 6-3 6 3-2-8" />
    </IconBase>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M4 21h16" />
    </IconBase>
  );
}

export function DocumentIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M7 2h7l5 5v15H7z" />
      <path d="M14 2v5h5" />
      <path d="M10 12h4" />
      <path d="M10 16h6" />
    </IconBase>
  );
}

export function FireIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 2s4 3 4 7a4 4 0 0 1-8 0c0-2 1-4 4-7Z" />
      <path d="M9 14a3 3 0 0 0 6 0c0-1.5-1-2.5-3-4-2 1.5-3 2.5-3 4Z" />
    </IconBase>
  );
}

export function MedalIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M8 2h8l-2 6h-4Z" />
      <circle cx="12" cy="15" r="5" />
      <path d="m10.5 15 1 1 2-2" />
    </IconBase>
  );
}
