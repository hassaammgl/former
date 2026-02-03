import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { nanoid } from "nanoid"

const initialMeta: FormMeta = {
    id: nanoid(),
    title: "Untitled Form",
    description: "Write your description here",
}

export const useBuilderStore = create<FormBuilderState>()(
    // immer((set, get) => ({
    immer((set) => ({
        meta: initialMeta,
        fields: [],
        selectedFieldId: null,
        isDirty: false,
        // history: [],
        // historyIndex: -1,

        // _pushHistory: () => {
        //     const { fields, history, historyIndex } = get()
        //     const snapshot = JSON.parse(JSON.stringify(fields))

        //     set((state) => {
        //         state.history = history.slice(0, historyIndex + 1)
        //         state.history.push(snapshot)
        //         state.historyIndex++
        //     })
        // },

        addField: (type) => {
            set((state) => {
                const field: Field = {
                    id: nanoid(),
                    type,
                    label: "New Field",
                    required: false,
                    options: type === "select" || type === "radio" ? [] : undefined,
                }
                state.fields.push(field)
                state.isDirty = true
            })
            // ; (get() as any)._pushHistory()
        },

        // updateField: (id, data) => {
        //     set((state) => {
        //         const field = state.fields.find((f) => f.id === id)
        //         if (field) Object.assign(field, data)
        //         state.isDirty = true
        //     })
        //         ; (get() as any)._pushHistory()
        // },

        // deleteField: (id) => {
        //     set((state) => {
        //         state.fields = state.fields.filter((f) => f.id !== id)
        //         if (state.selectedFieldId === id) state.selectedFieldId = null
        //         state.isDirty = true
        //     })
        //         ; (get() as any)._pushHistory()
        // },

        // reorderFields: (from, to) => {
        //     set((state) => {
        //         const [moved] = state.fields.splice(from, 1)
        //         state.fields.splice(to, 0, moved)
        //         state.isDirty = true
        //     })
        //         ; (get() as any)._pushHistory()
        // },

        // selectField: (id) => {
        //     set((state) => {
        //         state.selectedFieldId = id
        //     })
        // },

        // addOption: (fieldId) => {
        //     set((state) => {
        //         const field = state.fields.find((f) => f.id === fieldId)
        //         if (!field || !field.options) return
        //         field.options.push({
        //             id: nanoid(),
        //             label: "Option",
        //             value: "option",
        //         })
        //         state.isDirty = true
        //     })
        //         ; (get() as any)._pushHistory()
        // },

        // updateOption: (fieldId, optionId, data) => {
        //     set((state) => {
        //         const field = state.fields.find((f) => f.id === fieldId)
        //         if (!field?.options) return
        //         const opt = field.options.find((o) => o.id === optionId)
        //         if (opt) Object.assign(opt, data)
        //         state.isDirty = true
        //     })
        //         ; (get() as any)._pushHistory()
        // },

        // deleteOption: (fieldId, optionId) => {
        //     set((state) => {
        //         const field = state.fields.find((f) => f.id === fieldId)
        //         if (!field?.options) return
        //         field.options = field.options.filter((o) => o.id !== optionId)
        //         state.isDirty = true
        //     })
        //         ; (get() as any)._pushHistory()
        // },

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
                Object.assign(state.meta, meta)
                state.isDirty = true
            })
        },
    }))
)
