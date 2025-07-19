import NavBar from "./NavBar"
import Image from 'next/image'


function Header() {
  return (
    <header className="w-full backdrop-blur sticky top-0 z-50 ">
      <div className="max-w-5xl mx-auto px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Eupatheia Logo" width={40} height={40} />
          <h1 className="font-black text-lg text-[#2D3142]">EUPATHEIA</h1>
        </div>
        
        <NavBar />
      </div>
    </header>
  )
}

export default Header