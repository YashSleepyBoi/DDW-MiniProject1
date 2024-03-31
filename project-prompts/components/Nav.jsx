"use client";
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {useState, useEffect} from 'react'
import {signIn, signOut,useSession,getProviders} from 'next-auth/react'

const Nav = () => {

  const isUserLoggedIn = true;
  const [providers,setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false);
  useEffect(()=>{
    const setProviders = async ()=>{
      const providers = await getProviders()
      setProviders(providers)
    }
    setProviders();
  },[])
  return (
    <nav className="flex-between w-full mb-16 pt-3">

    <Link href="/" className="flex gap-2 flex-center">
      <Image src="/assets/images/logo.svg" width={40} height={40} alt="logo" className="object-contain" />
      <p className="logo_text">Prompt Share</p>

    </Link>
    {/*Desktop/mobile view */}
    <div className="invisible md:visible md:flex">
    { isUserLoggedIn ? (
      <div className="flex gap-3 md:gap-5">
        <Link href="/create-prompt" className='black_btn'> Create Post</Link>
        <button className="outline_btn" onClick={signOut}>Sign Out</button>
        <Link href="/profile">
          <Image className="rounded-full" src="/assets/images/logo.svg" width={37} height={37} alt="profile"></Image>
        </Link>
      </div>
    ):(
      <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
    )}
    </div>
    {/*Mobile view */}
    <div className="invisible sm:visible md:invisible sm:flex sm:relative">
    { isUserLoggedIn ? (
      <div className="flex">
          <Image 
          className="rounded-full" 
          src="/assets/images/logo.svg" 
          width={37} height={37} 
          alt="profile" 
          onClick={()=>setToggleDropdown(!toggleDropdown)} 
          ></Image>

      </div>
    ):(
      <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
    )}
    </div>
    </nav>
      )
}

export default Nav