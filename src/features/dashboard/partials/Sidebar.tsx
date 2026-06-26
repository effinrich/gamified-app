import { Link } from '@tanstack/react-router'
import type { NavItemConfig } from '../types'
import { NavIcon } from './NavIcon'
import { css, cx } from 'styled-system/css'
import { HStack, Stack } from '~/components/ui/layout'
import { Badge } from '~/components/ui/badge'

interface SidebarProps {
  items: NavItemConfig[]
  applicationCount: number
}

const sidebarStyles = {
  root: css({
    width: '240px',
    backgroundColor: 'bg.panel',
    borderRightWidth: '1px',
    borderColor: 'border.default',
    display: 'flex',
    flexDirection: 'column',
    padding: '28px 20px',
    flexShrink: 0,
    position: 'sticky',
    top: 0,
    height: '100vh',
  }),
  logo: css({
    fontFamily: 'display',
    fontSize: '22px',
    fontWeight: 600,
    letterSpacing: '-0.02em',
    color: 'fg.default',
    textDecoration: 'none',
    marginBottom: '4px',
  }),
  logoAccent: css({ color: 'accent.default' }),
  sub: css({
    fontFamily: 'mono',
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'fg.muted',
    marginBottom: '36px',
  }),
  navItem: css({
    padding: '10px 12px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 500,
    color: 'fg.muted',
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginBottom: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: 'transparent',
    width: '100%',
    textAlign: 'left',
    fontFamily: 'body',
    textDecoration: 'none',
    _hover: { backgroundColor: 'accent.subtle', color: 'fg.default' },
    '&[aria-current="page"]': {
      backgroundColor: 'accent.subtle',
      color: 'fg.default',
    },
  }),
  navIcon: css({
    width: '16px',
    height: '16px',
    opacity: 0.7,
    flexShrink: 0,
  }),
  foot: css({
    marginTop: 'auto',
    paddingTop: '24px',
    fontSize: '12px',
    color: 'fg.muted',
    lineHeight: '1.5',
  }),
}

export function Sidebar({ items, applicationCount }: SidebarProps) {
  return (
    <aside className={sidebarStyles.root}>
      <Link to="/" className={sidebarStyles.logo}>
        Fair<span className={sidebarStyles.logoAccent}>shot</span>
      </Link>
      <div className={sidebarStyles.sub}>Job Search Tool</div>

      <Stack gap="1">
        {items.map((item) => {
          const showCount =
            item.showCount && applicationCount > 0
          return (
            <Link
              key={item.to}
              to={item.to}
              className={sidebarStyles.navItem}
            >
              <NavIcon name={item.icon} />
              <span>{item.label}</span>
              {showCount && (
                <span style={{ marginLeft: 'auto' }}>
                  <Badge variant="solid" size="sm">
                    {applicationCount}
                  </Badge>
                </span>
              )}
            </Link>
          )
        })}
      </Stack>

      <div className={sidebarStyles.foot}>
        You haven’t paid us in three months. That’s fine.
      </div>
    </aside>
  )
}
