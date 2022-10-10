import { Flexbox } from '@beercode/common-frontend'
import styled from 'styled-components'

import { ThemeObj } from './FolderTree.types'

export const TreeContainer = styled(Flexbox)`
  padding-left: 0.25rem;
  margin-left: 0.25rem;
  height: 100%;
  border-left: 1px solid transparent;
  transition: border-left 0.4s ease;
`

export const NodeContainer = styled(Flexbox)``

export const FolderContainer = styled(Flexbox)``

export const Row = styled(Flexbox)<{ active?: boolean; theme: ThemeObj }>`
  ${({ active, theme }) =>
    active &&
    `
    background: ${theme.active} !important;
  `}
  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.hover};
  }
`

export const Container = styled(Flexbox)<{ theme: ThemeObj }>`
  width: 16rem;
  color: ${({ theme }) => theme.textColor};
  ${NodeContainer}, ${FolderContainer}, ${Row} {
    width: 100%;
  }
  &:hover {
    ${TreeContainer}:not(:first-child) {
      border-left: 1px solid ${({ theme }) => theme.lines};
    }
  }
`
