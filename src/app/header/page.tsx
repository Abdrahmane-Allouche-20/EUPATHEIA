import NavBar from "./NavBar"
//#7B9E5F OLIVE GREEN
//B5AACF
//BFC9D9 silver
//FF8882  light red
//2D3142  midnight blue

function Header() {
  return (
    <header className="w-full    backdrop-blur sticky top-0 z-50 ">
      <div className="max-w-5xl mx-auto px-3 py-2 flex items-center justify-between">
        <h1 className="font-black text-lg text-[#2D3142]">IGNAVIA</h1>
        <NavBar />
      </div>
    </header>
  )
}

export default Header