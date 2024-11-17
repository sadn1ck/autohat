import * as RTabs from "@radix-ui/react-tabs";
import clsx from "clsx";
import { Glasses, GraduationCapIcon, Waves } from "lucide-react";

const actions = [
  {
    name: "Hats",
    icon: <GraduationCapIcon />,
  },
  {
    name: "Moustaches",
    icon: <Waves />,
  },
  {
    name: "Glasses",
    icon: <Glasses />,
  },
];

type ActionPanelProps = {};

export const ActionPanel = ({}: ActionPanelProps) => {
  return (
    <RTabs.Root className="h-full flex" orientation="vertical">
      <RTabs.List dir="vertical" className={clsx(["inline-flex flex-col gap-2", "bg-red-500"])}>
        {actions.map((action) => {
          return (
            <RTabs.Trigger
              key={action.name}
              value={action.name}
              className={clsx([
                "p-0.5 rounded-md",
                "w-full aspect-square",
                "flex flex-col gap-1 justify-center items-center",
                "data-[state=active]:rounded-r-none",
              ])}
            >
              <span>{action.icon}</span>
              <span className="text-xs">{action.name}</span>
            </RTabs.Trigger>
          );
        })}
      </RTabs.List>
      {actions.map((action, index) => {
        return (
          <RTabs.Content
            key={action.name}
            value={action.name}
            className={clsx(["h-full p-2 w-full"])}
          >
            <span>
              {index} -{action.icon}
            </span>
          </RTabs.Content>
        );
      })}
    </RTabs.Root>
  );
};
