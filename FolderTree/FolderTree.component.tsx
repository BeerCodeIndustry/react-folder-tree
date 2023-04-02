import {
  Color,
  Icon,
  IconFilename,
  IconSize,
  TextElement,
  Typography,
} from '@beercode/common-frontend'
import { ChevronDown, ChevronRight, FolderSVG } from '@beercode/common-icons'
import { useToggle } from '@beercode/common-utils'
import React, { MouseEvent, useContext, useMemo } from 'react'

import {
  Checkbox,
  Container,
  ItemContainer,
  NodeContainer,
  Row,
  TreeContainer,
} from './FolderTree.styles'
import { File, Folder, FolderTreeProps, RowProps } from './FolderTree.types'
import { FolderTreeContext, FolderTreeProvider } from './context'
import { reqSort } from './utils/sortNode'

const TreeRow: React.FC<RowProps> = ({
  children,
  onClick,
  id,
  ...flexboxProps
}) => {
  const { activeId, selected, onCheck, canSelect } =
    useContext(FolderTreeContext)

  const handleCheck = (e: MouseEvent<HTMLElement>): void => {
    e.stopPropagation()
    e.preventDefault()
    onCheck(id)
  }

  return (
    <Row active={activeId === id} onClick={onClick} {...flexboxProps}>
      {children}
      {canSelect && (
        <Checkbox
          onCheck={handleCheck}
          fillColor='VIOLET_700'
          isRounded
          checked={
            // TODO add mb??
            // !!selected.find(selectedId => id?.match(RegExp(`${selectedId}`)))
            selected.includes(id!)
          }
          arrowColor='WHITE'
        />
      )}
    </Row>
  )
}

const RenderFolder: React.FC<Folder> = ({ name, files, id }) => {
  const [isOpen, toggleOpen] = useToggle(false)
  const { onRowClick } = useContext(FolderTreeContext)

  const onClick = (e: React.MouseEvent<HTMLElement>): void => {
    toggleOpen()
    onRowClick(id, true)
    e.stopPropagation()
  }

  return (
    <ItemContainer flexDirection='column'>
      <TreeRow onClick={onClick} alignItems='center' gap={0.5} id={id}>
        <Icon color={Color.BLUE_300} size={IconSize.SM}>
          {isOpen ? <ChevronDown /> : <ChevronRight />}
        </Icon>
        <Icon color={Color.INDIGO_800}>
          <FolderSVG />
        </Icon>
        <TextElement typography={Typography.BASE}>{name}</TextElement>
      </TreeRow>
      {isOpen && <RenderTree tree={files} />}
    </ItemContainer>
  )
}

const RenderFile: React.FC<File> = ({ name, id }) => {
  const { onRowClick } = useContext(FolderTreeContext)

  const onClick = (e: React.MouseEvent<HTMLElement>): void => {
    onRowClick(id)
    e.stopPropagation()
  }

  return (
    <ItemContainer flexDirection='column'>
      <TreeRow id={id} onClick={onClick} alignItems='center' gap={0.5}>
        <IconFilename fullFilename={name} typography={Typography.BASE} />
      </TreeRow>
    </ItemContainer>
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
  handleCheck,
  theme = 'dark',
  overrideTheme,
  activeId,
  canSelect,
  showLines,
}) => {
  const memoizedTree = useMemo(() => reqSort(tree), [tree])

  return (
    <FolderTreeProvider
      {...{
        canSelect,
        handleCheck,
        activeId,
        onFileClick,
        theme,
        overrideTheme,
      }}
    >
      <Container flexDirection='column' showLines={showLines}>
        <RenderTree tree={memoizedTree} />
      </Container>
    </FolderTreeProvider>
  )
}
