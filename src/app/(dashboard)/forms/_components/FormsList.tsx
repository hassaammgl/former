import {
  MoreHorizontal,
  Copy,
  Trash2,
  Edit,
  Archive,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import moment from "moment";
import { useFormData } from "./useFormData";

const FormsList = () => {
  const {
    filteredForms,
    getStatusBadge,
    handleArchive,
    handleDelete,
    handleDuplicate,
    searchQuery,
    setSearchQuery,
    setStatusFilter,
    statusFilter,
  } = useFormData();

  return (
    <>
      {filteredForms.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">No forms found</p>
          {searchQuery || statusFilter !== "all" ? (
            <Button
              variant="link"
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
              }}
              className="mt-2"
            >
              Clear filters
            </Button>
          ) : (
            <Button asChild className="mt-4">
              <Link href="/builder">Create your first form</Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="rounded-lg border border-border divide-y divide-border">
          {filteredForms.map((form) => (
            <div
              key={form.id}
              className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/forms/${form.id}`}
                    className="text-sm font-medium hover:underline truncate block"
                  >
                    {form.name}
                  </Link>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Created {moment(form.createdAt).fromNow()} | Updated{" "}
                    {moment(form.updatedAt).fromNow()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge
                  variant="secondary"
                  className={getStatusBadge(form).className}
                >
                  {getStatusBadge(form).label}
                </Badge>
                <span className="text-sm text-muted-foreground tabular-nums w-24 text-right">
                  {form.submissionsCount} submissions
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/forms/${form.id}`}
                        className="flex items-center gap-2"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    {form.isPublic && (
                      <DropdownMenuItem className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4" />
                        View live
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={() => handleDuplicate(form.id)}
                      className="flex items-center gap-2"
                    >
                      <Copy className="h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                    {form.isArchived && (
                      <DropdownMenuItem
                        onClick={() => handleArchive(form.id)}
                        className="flex items-center gap-2"
                      >
                        <Archive className="h-4 w-4" />
                        Archive
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleDelete(form.id)}
                      className="flex items-center gap-2 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FormsList;
