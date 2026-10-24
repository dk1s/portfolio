import {
  Package,
  Globe,
  Trophy,
  Radio,
  Flame,
  Ticket,
  Plane,
  LayoutTemplate,
  Eye,
  BatteryCharging,
  Boxes,
  type LucideIcon,
} from "lucide-react";

/**
 * Maps the `icon` key stored on a project to a lucide-react component.
 * Using real vector icons instead of emoji keeps the grid visually consistent
 * and renders crisply at every size.
 */
const iconMap: Record<string, LucideIcon> = {
  Package,
  Globe,
  Trophy,
  Radio,
  Flame,
  Ticket,
  Plane,
  LayoutTemplate,
  Eye,
  BatteryCharging,
};

interface ProjectIconProps {
  name: string;
  className?: string;
}

const ProjectIcon = ({ name, className }: ProjectIconProps) => {
  const Icon = iconMap[name] ?? Boxes;
  return <Icon className={className} aria-hidden="true" />;
};

export default ProjectIcon;
