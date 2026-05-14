"use client";

import { useState, useTransition, useEffect } from "react";
import { Plus, Trash2, Loader2 } from "lucide-react";
import {
  createSubject,
  deleteSubject,
  getSubjects,
} from "@/app/actions/subject";
import { useToast } from "@/hooks/useToast";

interface Subject {
  _id: string;
  label: string;
  value: string;
}

export default function SubjectManager() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(true);
  const { addToast } = useToast();

  const fetchSubjects = async () => {
    setIsFetching(true);
    const data = await getSubjects();
    setSubjects(data);
    setIsFetching(false);
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleAddSubject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const result = await createSubject(formData);
      if (result.success) {
        addToast(
          "success",
          "Subject created",
          "New subject has been added to the list.",
        );
        form.reset();
        fetchSubjects();
      } else if (result.error) {
        addToast("error", "Failed to create", result.error);
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this subject?")) return;

    startTransition(async () => {
      const result = await deleteSubject(id);
      if (result.success) {
        addToast("success", "Subject deleted", "The subject has been removed.");
        fetchSubjects();
      } else if (result.error) {
        addToast("error", "Error", result.error);
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Create Form */}
      <form onSubmit={handleAddSubject} className="space-y-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted">
            Subject Label
          </label>
          <input
            type="text"
            name="label"
            placeholder="e.g. Partnership Request"
            required
            className="w-full px-4 py-3 rounded border border-gray-100 text-sm focus:border-secondary outline-none transition-all placeholder:text-gray-300"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-primary text-white py-4 rounded text-[11px] font-black uppercase tracking-widest hover:bg-secondary transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Plus size={16} />
          )}
          Create Subject
        </button>
      </form>

      <div className="h-px bg-gray-100" />

      {/* List */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-muted">
          Existing Subjects
        </h3>

        {isFetching ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-gray-200" />
          </div>
        ) : subjects.length === 0 ? (
          <p className="text-sm text-gray-400 italic py-4">
            No subjects created yet.
          </p>
        ) : (
          <div className="space-y-2">
            {subjects.map((subject) => (
              <div
                key={subject._id}
                className="group flex items-center justify-between p-4 rounded border border-gray-100 hover:border-secondary transition-all"
              >
                <div>
                  <p className="text-sm font-bold text-primary">
                    {subject.label}
                  </p>
                  <p className="text-[10px] font-mono text-gray-400 uppercase mt-0.5">
                    ID: {subject.value}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(subject._id)}
                  className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
