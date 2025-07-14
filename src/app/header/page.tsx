import NavBar from "./NavBar"
//#7B9E5F OLIVE GREEN
//B5AACF
//BFC9D9 silver
//FF8882  light red
//2D3142  midnight blue
function Header() {
  return (
    <div className="max-w-5xl mx-auto p-3 flex items-center justify-between">
        <h1 className="font-black text-lg text-[#2D3142]">IGNAVIA </h1>
        <NavBar/>
    </div>
  )
}

export default Header