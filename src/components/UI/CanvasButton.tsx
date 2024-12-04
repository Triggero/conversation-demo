import classNames from "classnames";

export interface CanvasButtonProps {
  disabled?: boolean;
  active?: boolean;
  onClick: () => void | Promise<void>;
  variant?: "mic" | "switcher" | "end";
  children?: React.ReactNode;
}

const CanvasButton = ({
  disabled,
  active,
  onClick,
  children,
  variant,
}: CanvasButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={classNames(
        "relative inline-flex items-center justify-center rounded-full transition-all disabled:pointer-events-none disabled:brightness-75 hover:brightness-90 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        {
          ["h-16 w-16 bg-white [&_svg]:size-7"]: variant == "mic",
          ["h-11 w-11 text-white bg-blue-500 hover:bg-blue-500/90 [&_svg]:size-5"]:
            variant == "switcher",
          ["h-11 w-11 text-white bg-red-600 hover:bg-red-600/90 [&_svg]:size-5"]:
            variant == "end",
          ["!bg-green-400 !text-white"]: active,
        }
      )}
      onClick={onClick}
    >
      <span
        className={classNames({
          ["animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75"]:
            active,
        })}
      />
      {children}
    </button>
  );
};

export default CanvasButton;
