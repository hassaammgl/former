"use client";
// TODO: Add fuctionaity of Preview and
import {
  Sidebar,
  SidebarFooter,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useBuilderStore } from "@/store/builderStore";
import { FIELD_SCHEMA, FIELD_TYPES } from "@/constants";
import { ModeToggle } from "@/components/ui/mode-toogle";
import { PlusCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Header from "./header";
import React, { memo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const FieldsSelectMenu = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden border border-neutral-200 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800">
        <SidebarComponent />

        <main className="flex flex-1 flex-col overflow-hidden">
          <Header />

          <ScrollArea className="flex-1">{children}</ScrollArea>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default FieldsSelectMenu;

interface GroupsI {
  fieldsType: string;
}

const Group = memo(function Group({ fieldsType }: GroupsI) {
  const { addField } = useBuilderStore();
  return (
    <SidebarGroup>
      <div className="py-4">
        <h3 className="text-sm font-normal underline">
          {fieldsType?.toUpperCase()}
        </h3>
      </div>
      <SidebarMenu className="gap-2">
        {FIELD_SCHEMA.map((f) => {
          if (f.category !== fieldsType) {
            return;
          }
          return (
            <Tooltip key={f._id}>
              <TooltipTrigger asChild>
                <SidebarMenuButton
                  onClick={() => addField(f.type as FieldType)}
                  className="px-2 py-4 border hover:font-bold transition-transform duration-200"
                >
                  <f.icon className="text-black dark:text-primary" /> {f.label}{" "}
                  <PlusCircle className="ml-auto" />
                </SidebarMenuButton>
              </TooltipTrigger>
              <TooltipContent updatePositionStrategy="optimized">
                <p>{f.description}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
});

const SidebarComponent = () => {
  const { meta, setMeta } = useBuilderStore();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Label>Description</Label>
        <Textarea
          value={meta.description}
          onChange={(e) => setMeta({ ...meta, description: e.target.value })}
        />

        <div className="py-4 border-b border-border">
          <h2 className="text-sm font-semibold">Fields</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Drag fields to the canvas
          </p>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {FIELD_TYPES.map((t, i) => (
          <Group key={i} fieldsType={t} />
        ))}
      </SidebarContent>

      <SidebarFooter>
        <div className="flex justify-between">
          <ModeToggle />
          <SidebarTrigger />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
