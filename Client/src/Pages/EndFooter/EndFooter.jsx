import React from 'react'

function EndFooter() {
    const date=new Date();
    const year=date.getFullYear()
  return (
    <footer className='flex inset bottom-0 rounder-lg bg-slate-100 px-4 py-1'>
        <p>copyright &copy; {year} FocusFlow |</p>
        <button className='ml-3'>
            <p>About Us |</p>
        </button>
        <button className='ml-3'>
            <p>About Developers</p>
        </button>
    </footer>
  )
}

export default EndFooter