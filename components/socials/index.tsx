import { useState } from 'react';
import { FaWhatsapp, FaDiscord } from "react-icons/fa";
import { FiGithub, FiTwitter, FiInstagram, FiMail, FiSend, FiLinkedin } from "react-icons/fi";


export default function Socials() {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const socialLinks = [
    { href: "https://github.com/TGS963", icon: <FiGithub className="w-5 h-5" />, text: "GitHub" },
    { href: "https://www.linkedin.com/in/suvojit-ghosh/", icon: <FiLinkedin className="w-5 h-5" />, text: "LinkedIn" },
    { href: "https://t.me/tgs963", icon: <FiSend className="w-5 h-5" />, text: "Telegram" },
    { href: "https://wa.me/+917003900486", icon: <FaWhatsapp className="w-5 h-5" />, text: "WhatsApp" },
    { href: "https://discord.com/users/tgs963", icon: <FaDiscord className="w-5 h-5" />, text: "Discord" },
    { href: "https://x.com/@TheGodSlayer963", icon: <FiTwitter className="w-5 h-5" />, text: "Twitter" },
    { href: "https://instagram.com/tgs963", icon: <FiInstagram className="w-5 h-5" />, text: "Instagram" },
    { href: "mailto:ghoshsuvojit2012@gmail.com", icon: <FiMail className="w-5 h-5" />, text: "Email" },
    ];

    return (
        <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
        <button
            type='button'
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="md:disabled flex justify-between items-center w-full md:hover:bg-transparent md:cursor-default hover:bg-green-100 transition-all pt-2 ease-in-out duration-300 rounded-lg dark:hover:bg-green-900/30"
        >
            <p className="text-2xl md:text-start text-center font-medium frutiger-metallic-text">Find me at</p>
        </button>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 transition-all duration-300 ease-in-out
        ${isCollapsed ? 'max-h-0 md:max-h-none overflow-hidden' : 'max-h-screen'}`}
        >
        {socialLinks.map(({ href, icon, text }) => (
            <a
            key={href}
            href={href}
            className="justify-center text-center flex items-center gap-2 p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 
                hover:text-green-600 transition-all duration-200"
            >
            {icon}
            <span className='inline md:hidden'>{text}</span>
            </a>
        ))}
        </div>
    </div>
    )
};