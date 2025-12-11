import { SpotifyLayout } from "@/components/spotify";

export default function SpotifyRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SpotifyLayout>{children}</SpotifyLayout>;
}
