import { Footer } from "flowbite-react"
import { Link } from "react-router-dom"
import {BsFacebook , BsInstagram, BsTwitterX, BsGithub, BsDribbble} from 'react-icons/bs'
function FooterComp() {
  return (
    <Footer container className="border border-t-8 border-teal-700">
        <div className="w-full max-w-7xl mx-auto">
            <div className="grid w-full justify-between sm:flex md:grid-cols-1">

                <div className="mt-5">
                    <Link  to="/" className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
                        <span className='px-2 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl text-white'>Blogify</span>
                    </Link>
                </div>

                <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                    <div>
                        <Footer.Title title="About"> </Footer.Title>
                        <Footer.LinkGroup col> 
                            <Footer.Link href="https://www.google.com" target="_blank" rel="noopener noreferrer"> Blog App</Footer.Link>
                        </Footer.LinkGroup>
                        <Footer.LinkGroup col> 
                            <Footer.Link href="https://www.google.com" target="_blank" rel="noopener noreferrer"> Blogify</Footer.Link>
                        </Footer.LinkGroup>
                    </div>

                    <div>
                        <Footer.Title title="Follow US"> </Footer.Title>
                        <Footer.LinkGroup col> 
                            <Footer.Link href="https://www.google.com" target="_blank" rel="noopener noreferrer"> Github</Footer.Link>
                        </Footer.LinkGroup>
                        <Footer.LinkGroup col> 
                            <Footer.Link href="https://www.google.com" target="_blank" rel="noopener noreferrer"> LinkedIn</Footer.Link>
                        </Footer.LinkGroup>
                        <Footer.LinkGroup col> 
                            <Footer.Link href="https://www.google.com" target="_blank" rel="noopener noreferrer"> LinkedIn</Footer.Link>
                        </Footer.LinkGroup>
                    </div>

                    <div>
                        <Footer.Title title="legal"> </Footer.Title>
                        <Footer.LinkGroup col> 
                            <Footer.Link href="https://www.google.com" target="_blank" rel="noopener noreferrer"> Privacy Policy</Footer.Link>
                        </Footer.LinkGroup>
                        <Footer.LinkGroup col> 
                            <Footer.Link href="https://www.google.com" target="_blank" rel="noopener noreferrer"> Help Centre</Footer.Link>
                        </Footer.LinkGroup>
                        <Footer.LinkGroup col> 
                            <Footer.Link href="https://www.google.com" target="_blank" rel="noopener noreferrer"> Terms & Conditions</Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                </div>

            </div>
            <Footer.Divider/>
            <div className="w-full sm:flex sm:items-center sm:justify-between">
                <Footer.Copyright href='#' by='Blogify' year={new Date().getFullYear()}/>
                <div className="flex gap-6 mt-4 sm:mt-0 sm:justify-center">
                    <Footer.Icon href='#' icon={BsFacebook}/>
                    <Footer.Icon href='#' icon={BsTwitterX}/>
                    <Footer.Icon href='#' icon={BsInstagram}/>
                    <Footer.Icon href='#' icon={BsGithub}/>
                    <Footer.Icon href='#' icon={BsDribbble}/>
                </div>
            </div>
        </div>
    </Footer>
  )
}

export default FooterComp

// target="_blank" opens link in new tab;

// rel="noopener noreferrer"
// The noopener value ensures that the new page opened by the link does not have access to the window.opener property. This is important for security reasons because if the window.opener property is accessible, the new page can potentially manipulate the original page, which can lead to security vulnerabilities like phishing attacks or unwanted redirects.

// The noreferrer value prevents the browser from sending the Referer header to the new page. The Referer header typically includes the URL of the page where the link was clicked, which could potentially expose sensitive information about the user's browsing history or the structure of the web application.
//new Date().getFullYear() gives current year