import {
  Color,
  Icon,
  IconFilename,
  IconSize,
  TextElement,
  Typography,
} from '@beercode/common-frontend'
import { ChevronDown, ChevronRight } from '@beercode/common-icons'
import { useToggle } from '@beercode/common-utils'
import React, { useContext, useMemo } from 'react'

import {
  Container,
  FolderContainer,
  NodeContainer,
  Row,
  TreeContainer,
} from './FolderTree.styles'
import { File, Folder, FolderTreeProps } from './FolderTree.types'
import { FolderTreeContext, FolderTreeProvider } from './context'
import { reqSort } from './utils/sortNode'

const RenderFolder: React.FC<Folder> = ({ name, files, id }) => {
  const [isOpen, toggleOpen] = useToggle(false)
  const { onRowClick, activeId } = useContext(FolderTreeContext)

  const onClick = (e: React.MouseEvent<HTMLElement>): void => {
    toggleOpen()
    onRowClick(id, true)
    e.stopPropagation()
  }

  return (
    <FolderContainer flexDirection='column'>
      <Row
        onClick={onClick}
        alignItems='center'
        gap={0.5}
        active={activeId === id}
      >
        <Icon color={Color.BLUE_300} size={IconSize.SM}>
          {isOpen ? <ChevronDown /> : <ChevronRight />}
        </Icon>
        <TextElement typography={Typography.BASE}>{name}</TextElement>
      </Row>
      {isOpen && <RenderTree tree={files} />}
    </FolderContainer>
  )
}

const RenderFile: React.FC<File> = ({ name, id }) => {
  const { onRowClick, activeId } = useContext(FolderTreeContext)

  const onClick = (e: React.MouseEvent<HTMLElement>): void => {
    onRowClick(id)
    e.stopPropagation()
  }

  return (
    <Row active={activeId === id} onClick={onClick}>
      <IconFilename fullFilename={name} typography={Typography.BASE} />
    </Row>
  )
}

const RenderTree: React.FC<Partial<Pick<FolderTreeProps, 'tree'>>> = ({
  tree,
}) => {
  const { onBlur } = useContext(FolderTreeContext)

  return (
    <TreeContainer flexDirection='column' onClick={onBlur}>
      {tree?.map(item => (
        <NodeContainer key={item.id}>
          {item.type === 'folder' ? (
            <RenderFolder {...item} />
          ) : (
            <RenderFile {...item} />
          )}
        </NodeContainer>
      ))}
    </TreeContainer>
  )
}

export const FolderTree: React.FC<FolderTreeProps> = ({
  tree,
  onFileClick,
  theme = 'dark',
  overrideTheme,
  activeId,
}) => {
  const memoizedTree = useMemo(() => reqSort(tree), [tree])

  return (
    <FolderTreeProvider
      activeId={activeId}
      onFileClick={onFileClick}
      theme={theme}
      overrideTheme={overrideTheme}
    >
      <Container flexDirection='column'>
        <RenderTree tree={memoizedTree} />
      </Container>
    </FolderTreeProvider>
  )
}
