import { format } from "date-fns";

interface ChannelHeroProps {
  name?: string;
  creationTime?: number;
}

export const ChannelHero = ({ name, creationTime }: ChannelHeroProps) => {
  return (
    <div className="mt-[88px] mx-5">
      <p className="text-2xl font-bold mb-2"># {name}</p>
      {creationTime && (
        <p className="text-slate-800 mb-4">
          This channel was created on {format(new Date(creationTime), "PPP")}.
          This is the very beginning of the <strong>{name}</strong> channel.
        </p>
      )}
    </div>
  );
};
