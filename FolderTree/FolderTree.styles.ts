import { Flexbox , Checkbox as CFCheckbox } from '@beercode/common-frontend'

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

export const ItemContainer = styled(Flexbox)``

export const Row = styled(Flexbox)<{ active?: boolean; theme: ThemeObj }>`
  position: relative;
  ${({ active, theme }) =>
    active &&
    `
    background: ${theme.active} !important;
  `}
  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.hover};
  }
  padding: 0.5rem 1rem;
`

export const Checkbox = styled(CFCheckbox)`
  position: absolute;
  right: -2rem;
`

export const Container = styled(Flexbox)<{
  theme: ThemeObj
  showLines?: boolean
}>`
  width: 16rem;
  color: ${({ theme }) => theme.textColor};
  ${NodeContainer}, ${ItemContainer}, ${Row} {
    width: 100%;
  }
  &:hover {
    ${TreeContainer}:not(:first-child) {
      ${({ showLines, theme }) =>
        showLines && `border-left: 1px solid ${theme.lines}`};
    }
  }
`
