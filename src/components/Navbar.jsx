import React from 'react'

const Navbar = () => {
  return (
    <>
    <nav className='bg-slate-700 text-white flex justify-between p-2 text-xl px-5'>
      <div className="logo text-2xl">iTasks</div>
      <div className="right flex gap-6 ">
        <li className='list-none cursor-pointer hover:text-slate-400'>Home</li>
        <li className='list-none cursor-pointer hover:text-slate-400'>Your Tasks</li>
      </div>
        
    
    </nav>
    </>
  )
}

export default Navbar
