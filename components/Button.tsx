interface Props {
  onClick: () => void
  [p: string]: any
}

export default function Button({
  onClick = () => {},
  ...props
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={props.disabled}
      className={`bg-blue-600 rounded-md shadow-md border-2 border-blue-600 hover:border-white disabled:border-blue-600 disabled:opacity-80 disabled:cursor-not-allowed py-2 px-3 ${props.className}`}
    >
      {props.children}
    </button>
  );
}
