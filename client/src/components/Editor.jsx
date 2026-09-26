import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'

export default function Editor({ content, onChange }) {
  const token = localStorage.getItem('token'),

        uploadImage = async (file) => {
          const fd = new FormData()
          fd.append('image', file)
          const res = await fetch('/api/posts/upload-image', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: fd,
          })
          const data = await res.json()
          return data.url
        },
        
        editor = useEditor({
          extensions: [StarterKit, Image],
          content: content || '',
          onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
          },
          editorProps: {
            handleDrop: (view, event) => {
              const file = event.dataTransfer?.files?.[0]
              if (!file || !file.type.startsWith('image/')) return false 

              event.preventDefault()
              uploadImage(file).then((url) => {
                const { schema } = view.state
                const node = schema.nodes.image.create({ src: url })
                const transaction = view.state.tr.insert(view.state.selection.from, node)
                view.dispatch(transaction)
              })
              return true
            },
          },
        })

  if (!editor) return null

  return (
    <div className="editor-wrapper">
      <EditorContent editor={editor} />
    </div>
  )
}