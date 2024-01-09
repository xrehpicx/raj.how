import "./blur.scss";

export function TopBlur() {
  return (
    <div className="fixed z-50 top-0 left-0 w-full h-24 overflow-hidden">
      <div className="top-blur"></div>
    </div>
  );
}
