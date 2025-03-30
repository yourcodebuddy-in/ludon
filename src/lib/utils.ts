import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function getPlayerAvatar({
  playerName,
  reverse = false,
  playerColor,
}: {
  playerName: string;
  reverse?: boolean;
  playerColor?: string;
}) {
  const url = new URL("https://api.dicebear.com/9.x/thumbs/svg");
  url.searchParams.set("seed", playerName);
  url.searchParams.set("flip", String(reverse));
  if (playerColor) {
    url.searchParams.set("shapeColor", playerColor);
  }
  return url.toString();
}

export function getPlayerColor(id: number) {
  switch (id) {
    case 1:
      return "db5c4c";
    case 2:
      return "4187a0";
    case 3:
      return "f9c64b";
    case 4:
      return "629e76";
  }
}
