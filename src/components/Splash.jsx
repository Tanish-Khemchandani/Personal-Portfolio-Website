import tkLogo from "../assets/tk-logo.png";

export default function Splash() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden animate-splash-out"
      style={{
        background: "#000000",
        perspective: "800px",
      }}
    >
      <img src={tkLogo} alt="" className="splash-logo w-20 h-20 sm:w-28 sm:h-28 absolute" />
      <div className="splash-name-wrap">
        <div className="splash-name">
          TANISH KHEMCHANDANI
          <span className="splash-shine" aria-hidden="true">TANISH KHEMCHANDANI</span>
        </div>
      </div>
    </div>
  );
}
