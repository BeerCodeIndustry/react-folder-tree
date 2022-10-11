# React Folder Tree Component

Simple yet flexible folder tree component

[Live Demo](https://libs-demo.vercel.app/?path=/docs/libs-react-folder-tree--light-folder-tree)

## Default Folder Tree

```jsx
<FolderTree
  onFileClick={(id: string) => {}}
  tree={[
    {
      type: 'folder',
      name: 'client',
      files: [
        { type: 'file', name: 'Button.jsx' },
        { type: 'file', name: 'React-typescript.tsx' },
        { type: 'file', name: 'Typescript.ts' },
        { type: 'file', name: 'Json.json' },
      ],
    },
  ]}
/>
```

Made with <3 and React;
