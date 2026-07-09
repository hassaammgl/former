import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useSession } from "@/services/better-auth/auth-client";
import { useRouter } from "next/navigation";

export const useFormData = () => {
  const router = useRouter();
  const [forms, setForms] = useState<Form[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const getStatus = (form: Form) => {
    if (form.isArchived) return "archived";
    if (form.isPublic) return "published";
    return "draft";
  };

  const filteredForms = forms.filter((form) => {
    const matchesSearch = form.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || getStatus(form) === statusFilter;

    return matchesSearch && matchesStatus;
  });
  const { data: sessionData, error: sessionError } = useSession();
  if (sessionError) {
    router.push("/sign-in");
  }

  useEffect(() => {
    if (!sessionData?.user?.id) return;

    axios
      .get(`/api/forms/${sessionData.user.id}`)
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
        setForms(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [sessionData]);

  const getStatusBadge = (form: Form) => {
    if (form.isArchived) {
      return {
        label: "Archived",
        className: "bg-red-100 text-red-700",
      };
    }

    if (form.isPublic) {
      return {
        label: "Published",
        className: "bg-green-100 text-green-700",
      };
    }

    return {
      label: "Draft",
      className: "bg-gray-100 text-gray-700",
    };
  };

  const handleDuplicate = (id: string) => {
    toast.success(`Form duplicated ${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      if (!sessionData?.user?.id) {
        toast.error("You must be logged in.");
        return;
      }

      const res = await axios.delete("/api/forms/delete", {
        data: {
          userId: sessionData.user.id,
          formId: id,
        },
      });

      if (res.data.success) {
        setForms((prev) => prev.filter((form) => form.id !== id));
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message || "Failed to delete form.");
      }
    } catch (error: unknown) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong.");
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  const handleArchive = (id: string) => {
    console.log(id);

    toast.success("Form archived");
  };

  return {
    handleArchive,
    handleDelete,
    handleDuplicate,
    getStatusBadge,
    filteredForms,
    searchQuery,
    setSearchQuery,
    setStatusFilter,
    statusFilter
  };
};
