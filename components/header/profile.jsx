"use client";

import { logoutAction } from "@/actions/auth/logout-action";
import { useCurrentUser, useCurrentUserRole } from "@/hooks/auth-hooks";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { HelpCircle, LogOut, Settings, UserCog } from "lucide-react";
import { useRouter } from "next/navigation";

export const Profile = () => {
  const router = useRouter();
  const role = useCurrentUserRole();
  const user = useCurrentUser();

  const menuItems = [
    {
      key: "settings",
      href: "/admin/settings",
      label: "Paramètres",
      icon: <Settings className="text-primary" />,
    },
    {
      key: "team_settings",
      href: "/admin/team_settings",
      label: "Gérer votre équipe",
      icon: <UserCog className="text-primary" />,
    },
    {
      key: "help",
      href: "/admin/help",
      label: "Aide & retour",
      icon: <HelpCircle className="text-primary" />,
    },
    {
      key: "logout",
      href: "/auth",
      label: "Déconnexion",
      icon: <LogOut className="text-danger" />,
    },
  ];
  return (
    <div>
      {/* <User
        name={user.email}
        description={role}
        avatarProps={{
          src: `${
            theme === "dark"
              ? "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaXJjbGUtdXNlciI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSIzIi8+PHBhdGggZD0iTTcgMjAuNjYyVjE5YTIgMiAwIDAgMSAyLTJoNmEyIDIgMCAwIDEgMiAydjEuNjYyIi8+PC9zdmc+"
              : "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NCIgaGVpZ2h0PSI0NCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaXJjbGUtdXNlciI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSIzIi8+PHBhdGggZD0iTTcgMjAuNjYyVjE5YTIgMiAwIDAgMSAyLTJoNmEyIDIgMCAwIDEgMiAydjEuNjYyIi8+PC9zdmc+"
          }`,
        }}
        className="ml-5 flex items-center "
      /> */}
      <Dropdown placement="bottom-end" radius="sm">
        <DropdownTrigger>
          <Avatar
            showFallback
            isBordered
            color="primary"
            size="sm"
            as="button"
            className="transition-transform"
            aria-label="Profile"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold text-primary">{role}</p>
            <p className="font-semibold">{user.email}</p>
          </DropdownItem>

          {menuItems.map((el) => {
            return (
              <DropdownItem
                aria-label={el.label}
                key={el.key}
                startContent={el.icon}
                onClick={
                  el.key === "logout"
                    ? () => logoutAction()
                    : () => router.push(`/${el.href}`)
                }
              >
                <p
                  className={
                    el.key === "logout"
                      ? "text-danger font-semibold"
                      : "font-semibold"
                  }
                >
                  {el.label}
                </p>
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
