import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { nanoid } from "nanoid";
import { handleFields } from "@/lib/handleFields";
import { getFieldCategory } from "@/lib/get-field-category";

const initialMeta: FormMeta = {
  id: nanoid(),
  title: "Untitled Form",
  description: "Write your description here",
  version: "1",
};

export const useBuilderStore = create<FormBuilderState>()(
  immer((set) => ({
    meta: initialMeta,
    fields: [],
    selectedFieldId: null,
    isDirty: false,
    // history: [],
    // historyIndex: -1,

    addField: (type) => {
      const ftype = `${type.substring(0, 1).toUpperCase()}${type.substring(1)}`;

      set((state) => {
        if (getFieldCategory(type) === null) {
          const field: Field = {
            id: nanoid(),
            type,
            label: `New ${ftype} Field`,
            required: false,
            helperText: "",
            config: handleFields(type),
          };
          state.fields.push(field);
          state.isDirty = true;
        } else if (getFieldCategory(type) === "layout") {
          const field: Field = {
            id: nanoid(),
            type,
            innerText: `This is ${ftype}`,
          };
          state.fields.push(field);
          state.isDirty = true;
        } else {
          const field: Field = {
            id: nanoid(),
            type,
            label: `New ${ftype} Field`,
            required: false,
            helperText: "",
            options: [],
            config: handleFields(type),
          };
          state.fields.push(field);
          state.isDirty = true;
        }
      });
    },

    updateField: (id, data) => {
      set((state) => {
        const field = state.fields.find((f) => f.id === id);
        if (!field) return;
        Object.assign(field, data);
        state.isDirty = true;
      });
    },

    deleteField: (id) => {
      set((state) => {
        state.fields = state.fields.filter((f) => f.id !== id);
        state.isDirty = true;
      });
    },

    // reorderFields: (from, to) => {
    //     set((state) => {
    //         const [moved] = state.fields.splice(from, 1)
    //         state.fields.splice(to, 0, moved)
    //         state.isDirty = true
    //     })
    //         ; (get() as any)._pushHistory()
    // },

    selectField: (id) => {
      set((state) => {
        state.selectedFieldId = id;
      });
    },

    addOption: (fieldId) => {
      set((state) => {
        const field = state.fields.find((f) => f.id === fieldId);
        if (!field) return;
        if (!field.options) field.options = [];

        const count = field.options.length + 1;

        field.options.push({
          id: nanoid(),
          label: `Option ${count}`,
          value: `option-${count}`,
        });

        state.isDirty = true;
      });
    },

    updateOption: (fieldId, optionId, data) => {
      set((state) => {
        const field = state.fields.find((f) => f.id === fieldId);
        if (!field?.options) return;
        const opt = field.options.find((o) => o.id === optionId);
        if (opt) Object.assign(opt, data);
        state.isDirty = true;
      });
      // ; (get() as any)._pushHistory()
    },

    deleteOption: (fieldId, optionId) => {
      set((state) => {
        const field = state.fields.find((f) => f.id === fieldId);
        if (!field?.options) return;
        if (field.options.length <= 1) return;

        field.options = field.options.filter((opt) => opt.id !== optionId);

        state.isDirty = true;
      });
    },

    // undo: () => {
    //     const { historyIndex, history } = get()
    //     if (historyIndex <= 0) return
    //     set((state) => {
    //         state.historyIndex--
    //         state.fields = JSON.parse(JSON.stringify(history[state.historyIndex]))
    //     })
    // },

    // redo: () => {
    //     const { historyIndex, history } = get()
    //     if (historyIndex >= history.length - 1) return
    //     set((state) => {
    //         state.historyIndex++
    //         state.fields = JSON.parse(JSON.stringify(history[state.historyIndex]))
    //     })
    // },

    // resetForm: () => {
    //     set((state) => {
    //         state.meta = initialMeta
    //         state.fields = []
    //         state.selectedFieldId = null
    //         state.isDirty = false
    //         state.history = []
    //         state.historyIndex = -1
    //     })
    // },

    setMeta: (meta) => {
      set((state) => {
        Object.assign(state.meta, meta);
        state.isDirty = true;
      });
    },
  })),
);
