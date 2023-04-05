type Props = {
  label: string;
};

export function Title({ label }: Props) {
  return (
    <h1 className={"text-4xl md:text-5xl font-bold text-white text-center"}>{label}</h1>
  );
}