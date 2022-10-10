import { colors } from '@beercode/common-frontend'

import { Theme, ThemeObj } from '../FolderTree.types'

export const themes: Record<Theme, ThemeObj> = {
  dark: {
    textColor: colors.WHITE,
    active: colors.NEUTRAL_700,
    hover: colors.GRAY_800,
    lines: colors.NEUTRAL_500,
  },
  light: {
    textColor: colors.BLACK,
    active: colors.BLUE_100,
    hover: colors.GRAY_200,
    lines: colors.NEUTRAL_300,
  },
}
