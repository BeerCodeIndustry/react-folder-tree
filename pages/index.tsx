import { FolderTree, Tree } from 'FolderTree'
import React from 'react'

const tree: Tree = [
  {
    type: 'file',
    name: '3.ts',
  },
  {
    type: 'folder',
    name: '1',
    files: [
      {
        type: 'file',
        name: 'file_1.tsx',
      },
      {
        type: 'folder',
        name: 'folder_1',
        files: [
          {
            type: 'file',
            name: 'file_1.ts',
          },
          {
            type: 'folder',
            name: 'folder_1',
            files: [
              {
                type: 'file',
                name: 'file_1.js',
              },
              {
                type: 'folder',
                name: 'folder_1',
                files: [
                  {
                    type: 'file',
                    name: 'file_1.json',
                  },
                  {
                    type: 'folder',
                    name: 'folder_1',
                    files: [
                      {
                        type: 'file',
                        name: 'file_1.jsx',
                      },
                      {
                        type: 'folder',
                        name: 'folder_1',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'file',
    name: '3',
  },
  {
    type: 'folder',
    name: '2',
  },
]

const Home: React.FC = () => {
  return <FolderTree tree={tree} onFileClick={() => {}} theme='light' />
}

export default Home
