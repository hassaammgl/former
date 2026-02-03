"use client"

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Search } from "lucide-react";
import { useState } from "react";

export default function FormsPage() {
    const [statusFilter, setStatusFilter] = useState<string>('all');
    return (
        <div>

            {/* Filters */}
            <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search forms..."
                        // value={searchQuery}
                        // onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-36">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All status</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

// import { Link } from 'react-router-dom';
// import { Plus, Search, Filter, MoreHorizontal, Copy, Trash2, Edit, Archive, ExternalLink } from 'lucide-react';
// import { DashboardLayout } from '@/components/layout/DashboardLayout';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from '@/components/ui/select';
// import { cn } from '@/lib/utils';
// import { toast } from 'sonner';
// import { useState } from 'react';

// interface Form {
//     id: string;
//     name: string;
//     status: 'draft' | 'published' | 'archived';
//     createdAt: string;
//     updatedAt: string;
//     submissionsCount: number;
// }

// const mockForms: Form[] = [
//     { id: '1', name: 'Contact Form', status: 'published', createdAt: 'Dec 20, 2024', updatedAt: 'Dec 22, 2024', submissionsCount: 142 },
//     { id: '2', name: 'Newsletter Signup', status: 'published', createdAt: 'Dec 18, 2024', updatedAt: 'Dec 20, 2024', submissionsCount: 89 },
//     { id: '3', name: 'Feedback Survey', status: 'draft', createdAt: 'Dec 15, 2024', updatedAt: 'Dec 15, 2024', submissionsCount: 0 },
//     { id: '4', name: 'Event Registration', status: 'published', createdAt: 'Dec 10, 2024', updatedAt: 'Dec 19, 2024', submissionsCount: 256 },
//     { id: '5', name: 'Job Application', status: 'archived', createdAt: 'Nov 28, 2024', updatedAt: 'Dec 5, 2024', submissionsCount: 45 },
//     { id: '6', name: 'Customer Survey', status: 'draft', createdAt: 'Dec 21, 2024', updatedAt: 'Dec 21, 2024', submissionsCount: 0 },
// ];

// export default function Forms() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState<string>('all');

//   const filteredForms = mockForms.filter((form) => {
//     const matchesSearch = form.name.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesStatus = statusFilter === 'all' || form.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   const getStatusBadge = (status: Form['status']) => {
//     const variants: Record<Form['status'], { label: string; className: string }> = {
//       draft: { label: 'Draft', className: 'bg-muted text-muted-foreground' },
//       published: { label: 'Published', className: 'bg-success/10 text-success' },
//       archived: { label: 'Archived', className: 'bg-muted text-muted-foreground opacity-60' },
//     };
//     const { label, className } = variants[status];
//     return <Badge variant="secondary" className={className}>{label}</Badge>;
//   };

//   const handleDuplicate = (id: string) => {
//     toast.success('Form duplicated');
//   };

//   const handleDelete = (id: string) => {
//     toast.success('Form deleted');
//   };

//   const handleArchive = (id: string) => {
//     toast.success('Form archived');
//   };

//   return (
//     <DashboardLayout>
//       <div className="p-6 lg:p-8 space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-semibold tracking-tight">Forms</h1>
//             <p className="text-muted-foreground mt-1">
//               Create and manage your forms
//             </p>
//           </div>
//           <Button asChild>
//             <Link to="/forms/new">
//               <Plus className="h-4 w-4 mr-2" />
//               Create form
//             </Link>
//           </Button>
//         </div>

//         {/* Filters */}
//         <div className="flex items-center gap-3">
//           <div className="relative flex-1 max-w-sm">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Search forms..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-9"
//             />
//           </div>
//           <Select value={statusFilter} onValueChange={setStatusFilter}>
//             <SelectTrigger className="w-36">
//               <Filter className="h-4 w-4 mr-2" />
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All status</SelectItem>
//               <SelectItem value="draft">Draft</SelectItem>
//               <SelectItem value="published">Published</SelectItem>
//               <SelectItem value="archived">Archived</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Forms list */}
//         {filteredForms.length === 0 ? (
//           <div className="rounded-lg border border-dashed border-border p-12 text-center">
//             <p className="text-muted-foreground">No forms found</p>
//             {searchQuery || statusFilter !== 'all' ? (
//               <Button
//                 variant="link"
//                 onClick={() => {
//                   setSearchQuery('');
//                   setStatusFilter('all');
//                 }}
//                 className="mt-2"
//               >
//                 Clear filters
//               </Button>
//             ) : (
//               <Button asChild className="mt-4">
//                 <Link to="/forms/new">Create your first form</Link>
//               </Button>
//             )}
//           </div>
//         ) : (
//           <div className="rounded-lg border border-border divide-y divide-border">
//             {filteredForms.map((form) => (
//               <div
//                 key={form.id}
//                 className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
//               >
//                 <div className="flex items-center gap-4 min-w-0 flex-1">
//                   <div className="min-w-0 flex-1">
//                     <Link
//                       to={`/forms/${form.id}`}
//                       className="text-sm font-medium hover:underline truncate block"
//                     >
//                       {form.name}
//                     </Link>
//                     <p className="text-xs text-muted-foreground mt-0.5">
//                       Updated {form.updatedAt}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   {getStatusBadge(form.status)}
//                   <span className="text-sm text-muted-foreground tabular-nums w-24 text-right">
//                     {form.submissionsCount} submissions
//                   </span>
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" size="icon-sm">
//                         <MoreHorizontal className="h-4 w-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                       <DropdownMenuItem asChild>
//                         <Link to={`/forms/${form.id}`} className="flex items-center gap-2">
//                           <Edit className="h-4 w-4" />
//                           Edit
//                         </Link>
//                       </DropdownMenuItem>
//                       {form.status === 'published' && (
//                         <DropdownMenuItem className="flex items-center gap-2">
//                           <ExternalLink className="h-4 w-4" />
//                           View live
//                         </DropdownMenuItem>
//                       )}
//                       <DropdownMenuItem onClick={() => handleDuplicate(form.id)} className="flex items-center gap-2">
//                         <Copy className="h-4 w-4" />
//                         Duplicate
//                       </DropdownMenuItem>
//                       {form.status !== 'archived' && (
//                         <DropdownMenuItem onClick={() => handleArchive(form.id)} className="flex items-center gap-2">
//                           <Archive className="h-4 w-4" />
//                           Archive
//                         </DropdownMenuItem>
//                       )}
//                       <DropdownMenuSeparator />
//                       <DropdownMenuItem
//                         onClick={() => handleDelete(form.id)}
//                         className="flex items-center gap-2 text-destructive"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                         Delete
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </DashboardLayout>
//   );
// }
